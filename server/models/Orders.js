import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Orders = sequelize.define('Orders', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  isGuest: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 0
  },
  deliveryAddressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'DeliveryAddresses',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Preparing Order', 'Out for Delivery', 'Delivered', 'Cancelled'),
    allowNull: true,
    defaultValue: "Pending"
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: "Orders",
  timestamps: true,
});

export default Orders;