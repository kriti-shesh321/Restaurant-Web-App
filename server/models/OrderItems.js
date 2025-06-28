import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrderItems = sequelize.define('OrderItems', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'MenuItem',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: "OrderItems",
  timestamps: true
});

export default OrderItems;