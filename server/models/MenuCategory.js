import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const MenuCategory = sequelize.define('MenuCategory', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: "name"
  }
}, {
  tableName: 'MenuCategory',
  timestamps: true,
});

export default MenuCategory;