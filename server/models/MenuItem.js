import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const MenuItem = sequelize.define('MenuItem', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'MenuCategory',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: "name"
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imageURL: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  availability: {
    type: DataTypes.ENUM('onsite', 'online', 'both', 'none'),
    allowNull: true,
    defaultValue: "both"
  }
}, {
  tableName: "MenuItem",
  timestamps: true,
});

export default MenuItem;