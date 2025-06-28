import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RestaurantSettings = sequelize.define('RestaurantSettings', {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  value: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  tableName: 'RestaurantSettings',
  timestamps: true,
});

export default RestaurantSettings;