import { MenuItem, MenuCategory } from '../models/index.js';

export const getOfflineMenu = async (req, res, next) => {
    try {
        const menu = await MenuItem.findAll({
            attributes: { exclude: ['imageURL', 'categoryId'] },
            where: { availability: ['offline', 'both'] },
            include: [{
                model: MenuCategory,
                as: 'category',
                attributes: ['id', 'name']
            }]
        });

        return res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

export const getOnlineMenu = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const menu = await MenuItem.findAll({
            where: { availability: ['online', 'both'] },
            attributes: { exclude: ['categoryId'] },
            include: [{
                model: MenuCategory,
                as: 'category',
                attributes: ['id', 'name']
            }],
            limit: (limit && limit),
            order: [['createdAt', 'DESC']]
        });

        if (!menu) return res.status(404).json({ message: "Menu items not found." });
        return res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

export const getMenuItemById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const menuItem = await MenuItem.findOne({
            where: { id },
            attributes: { exclude: ['categoryId'] },
            include: [{
                model: MenuCategory,
                as: 'category',
                attributes: ['id', 'name']
            }]
        });

        if (!menuItem) return res.status(404).json({ message: "Menu item not found." });

        return res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

// export const addMenuItem = async (req, res, next) => {
//     try {
//         const { name, description, categoryId, price, image, availability } = req.body; 
//         if (!name || !description || !categoryId || !price || !availability) res.status(400).json({message: "Please enter all the cumpulsory details."});


//     } catch (error) {
//         res.status(500).json({message: "Server error."});
//     }
// }