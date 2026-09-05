import Stripe from "stripe";

import {
    Orders,
    Payments,
    sequelize,
} from "../models/index.js";

const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY
);

const CURRENCY = "usd";

// @desc Create or retrieve a Stripe PaymentIntent for an order
// @route POST /api/v1/payment/create-intent
export const createPaymentIntent = async (req, res) => {
    try {
        const userId = req.user;
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                message: "Order ID is required.",
            });
        }

        // Only allow the owner of the order to create its payment.
        const order = await Orders.findOne({
            where: {
                id: orderId,
                userId,
            },
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
            });
        }

        if (order.status !== "Pending") {
            return res.status(400).json({
                message: "Only pending orders can be paid.",
            });
        }

        const amount = Math.round(
            Number(order.totalAmount) * 100
        );

        if (!Number.isInteger(amount) || amount <= 0) {
            return res.status(400).json({
                message: "Invalid order amount.",
            });
        }

        // If we already created a PaymentIntent for this order,
        // reuse it rather than creating another one.
        let payment = await Payments.findOne({
            where: { orderId: order.id },
        });

        let paymentIntent;

        if (payment) {
            paymentIntent =
                await stripe.paymentIntents.retrieve(
                    payment.providerPaymentId
                );

            if (paymentIntent.status === "succeeded") {
                return res.status(400).json({
                    message: "This order has already been paid.",
                });
            }
        } else {
            paymentIntent =
                await stripe.paymentIntents.create(
                    {
                        amount,
                        currency: CURRENCY,

                        automatic_payment_methods: {
                            enabled: true,
                        },

                        metadata: {
                            orderId: String(order.id),
                            userId: String(userId),
                        },
                    },
                    {
                        // Prevent duplicate PaymentIntents if the
                        // request is retried.
                        idempotencyKey:
                            `order-${order.id}-payment`,
                    }
                );

            payment = await Payments.create({
                orderId: order.id,
                provider: "stripe",
                providerPaymentId:
                    paymentIntent.id,
                status: "pending",
                amount: order.totalAmount,
                currency: CURRENCY,
            });
        }

        return res.status(200).json({
            orderId: order.id,
            paymentId: payment.id,
            clientSecret:
                paymentIntent.client_secret,
        });

    } catch (error) {
        console.error(
            "Error creating payment intent:",
            error
        );

        return res.status(500).json({
            message: "Unable to initialize payment.",
        });
    }
};


// @desc Handle Stripe webhook events
// @route POST /api/v1/payment/webhook
export const handleStripeWebhook = async (req, res) => {
    const signature =
        req.headers["stripe-signature"];

    let event;

    try {
        event =
            stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
    } catch (error) {
        console.error(
            "Stripe webhook signature verification failed:",
            error.message
        );

        return res.status(400).send(
            `Webhook Error: ${error.message}`
        );
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent =
                    event.data.object;

                const transaction =
                    await sequelize.transaction();

                try {
                    const payment =
                        await Payments.findOne({
                            where: {
                                providerPaymentId:
                                    paymentIntent.id,
                            },
                            transaction,
                            lock: transaction.LOCK.UPDATE,
                        });

                    if (payment) {
                        await payment.update(
                            {
                                status: "succeeded",
                            },
                            { transaction }
                        );

                        const order =
                            await Orders.findByPk(
                                payment.orderId,
                                {
                                    transaction,
                                    lock: transaction.LOCK.UPDATE,
                                }
                            );

                        // Only confirm a pending order.
                        // Don't overwrite a cancelled/completed order.
                        if (
                            order &&
                            order.status === "Pending"
                        ) {
                            await order.update(
                                {
                                    status: "Confirmed",
                                },
                                { transaction }
                            );
                        }
                    }

                    await transaction.commit();

                } catch (error) {
                    await transaction.rollback();
                    throw error;
                }

                break;
            }

            case "payment_intent.processing": {
                const paymentIntent =
                    event.data.object;

                await Payments.update(
                    { status: "processing" },
                    {
                        where: {
                            providerPaymentId:
                                paymentIntent.id,
                        },
                    }
                );

                break;
            }

            case "payment_intent.payment_failed": {
                const paymentIntent =
                    event.data.object;

                await Payments.update(
                    { status: "failed" },
                    {
                        where: {
                            providerPaymentId:
                                paymentIntent.id,
                        },
                    }
                );

                break;
            }

            case "payment_intent.canceled": {
                const paymentIntent =
                    event.data.object;

                await Payments.update(
                    { status: "canceled" },
                    {
                        where: {
                            providerPaymentId:
                                paymentIntent.id,
                        },
                    }
                );

                break;
            }

            default:
                console.log(
                    `Unhandled Stripe event: ${event.type}`
                );
        }

        return res.status(200).json({
            received: true,
        });

    } catch (error) {
        console.error(
            "Error handling Stripe webhook:",
            error
        );

        return res.status(500).json({
            message: "Webhook handler failed.",
        });
    }
};