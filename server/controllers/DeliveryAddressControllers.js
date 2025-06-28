import { DeliveryAddresses, User } from "../models/index.js";

// @desc Get all delivery addresses for a user
// @route GET /api/v1/addresses
export const getDeliveryAddresses = async (req, res, next) => {
    try {
        const userId = req.user;
        const addresses = await DeliveryAddresses.findAll({
            where: { userId },
            order: [['createdAt', 'ASC']]
        });

        if (!addresses || addresses.length === 0) return res.status(404).json({ message: "No delivery addresses found." });

        return res.status(200).json(addresses);
    } catch (error) {
        console.error("Error fetching delivery addresses:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// @desc Add a new delivery address
// @route POST /api/v1/addresses
export const addDeliveryAddress = async (req, res, next) => {
    try {
        const userId = req.user || null;
        const { type, address, contact, city, state, country, zipCode, guestName } = req.body;

        if (!type || !address || !city || !state || !zipCode) {
            return res.status(400).json({ message: "Please enter mandatory fields." });
        }

        let userPhone = null;
        if (userId) {
            const user = await User.findByPk(userId);
            userPhone = user?.phone || null;
        }

        const finalContact = contact || userPhone;
        if (!finalContact) {
            return res.status(400).json({ message: "Please enter a contact number." });
        }

        const newAddress = await DeliveryAddresses.create({
            userId,
            type,
            contact: finalContact,
            address,
            city,
            state,
            country,
            zipCode,
            guestName: guestName || null
        });

        return res.status(201).json(newAddress);
    } catch (error) {
        console.error("Error adding delivery address:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// @desc Edit an existing delivery address
// @route PUT /api/v1/addresses/:id
export const editDeliveryAddress = async (req, res, next) => {
    try {
        const userId = req.user;
        const addressId = req.params.id;
        const { type, address, contact, city, state, country, zipCode } = req.body;

        if (!type || !address || !city || !state || !zipCode) {
            return res.status(400).json({ message: "Please enter mandatory fields." });
        }

        const addressToUpdate = await DeliveryAddresses.findOne({
            where: { id: addressId, userId }
        });

        if (!addressToUpdate) {
            return res.status(404).json({ message: "Address not found." });
        }

        addressToUpdate.type = type;
        addressToUpdate.contact = contact ? contact : addressToUpdate.contact;
        addressToUpdate.address = address;
        addressToUpdate.city = city;
        addressToUpdate.state = state;
        addressToUpdate.country = country;
        addressToUpdate.zipCode = zipCode;

        await addressToUpdate.save();

        return res.status(200).json(addressToUpdate);
    } catch (error) {
        console.error("Error editing delivery address:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// @desc Delete a delivery address
// @route DELETE /api/v1/addresses/:id
export const deleteDeliveryAddress = async (req, res, next) => {
    try {
        const userId = req.user;
        const addressId = req.params.id;

        const addressToDelete = await DeliveryAddresses.findOne({
            where: { id: addressId, userId }
        });

        if (!addressToDelete) {
            return res.status(404).json({ message: "Address not found." });
        }

        await addressToDelete.destroy();

        return res.status(200).json({ message: "Address deleted successfully." });
    } catch (error) {
        console.error("Error deleting delivery address:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};