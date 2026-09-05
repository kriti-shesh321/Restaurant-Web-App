'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Payments', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },

            orderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: 'Orders',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },

            provider: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'stripe',
            },

            providerPaymentId: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },

            status: {
                type: Sequelize.ENUM(
                    'pending',
                    'processing',
                    'succeeded',
                    'failed',
                    'canceled'
                ),
                allowNull: false,
                defaultValue: 'pending',
            },

            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },

            currency: {
                type: Sequelize.STRING(3),
                allowNull: false,
                defaultValue: 'usd',
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('Payments');
    },
};