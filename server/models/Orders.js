import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Orders = sequelize.define(
  "Orders",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    isGuest: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },

    orderType: {
      type: DataTypes.ENUM("delivery", "dine-in"),
      allowNull: false,
      defaultValue: "delivery",
    },

    deliveryAddressId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "DeliveryAddresses",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    tableNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Confirmed",
        "Preparing Order",
        "Ready",
        "Out for Delivery",
        "Served",
        "Delivered",
        "Cancelled"
      ),
      allowNull: true,
      defaultValue: "Pending",
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Orders",
    timestamps: true,
  }
);

export default Orders;