import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Cart = sequelize.define('Cart', {
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
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MenuItem',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    tableName: 'Cart',
    timestamps: true,
  });

export default Cart;