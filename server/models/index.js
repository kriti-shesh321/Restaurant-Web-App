import sequelize from "../config/database.js";

import User from "./User.js";
import DeliveryAddresses from "./DeliveryAddresses.js";
import MenuCategory from "./MenuCategory.js";
import MenuItem from "./MenuItem.js";
import Cart from "./Cart.js";
import RestaurantSettings from "./RestaurantSettings.js";
import Orders from "./Orders.js";
import OrderItems from "./OrderItems.js";
import Reviews from "./Reviews.js";

DeliveryAddresses.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(DeliveryAddresses, { foreignKey: 'userId', as: 'addresses' });

Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });

Cart.belongsTo(MenuItem, { foreignKey: 'itemId', as: 'menuItem' });
MenuItem.hasMany(Cart, { foreignKey: 'itemId' });

Orders.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Orders, { foreignKey: 'userId', as: 'orders' });

Orders.belongsTo(DeliveryAddresses, { foreignKey: 'deliveryAddressId', as: 'deliveryAddress' });
DeliveryAddresses.hasMany(Orders, { foreignKey: 'deliveryAddressId', as: 'orders' });

OrderItems.belongsTo(Orders, { foreignKey: 'orderId', as: 'order' });
Orders.hasMany(OrderItems, { foreignKey: 'orderId', as: 'items' });

OrderItems.belongsTo(MenuItem, { foreignKey: 'menuItemId', as: 'menuItem' });
MenuItem.hasMany(OrderItems, { foreignKey: 'menuItemId', as: 'orderItems' });

Reviews.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Reviews, { foreignKey: 'userId', as: 'reviews' });

MenuItem.belongsTo(MenuCategory, { foreignKey: 'categoryId', as: 'category' });
MenuCategory.hasMany(MenuItem, { foreignKey: 'categoryId', as: 'items' });

export {
    sequelize,
    User,
    DeliveryAddresses,
    MenuItem,
    MenuCategory,
    Cart,
    Orders,
    OrderItems,
    RestaurantSettings,
    Reviews
};