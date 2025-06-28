import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Reviews = sequelize.define('Reviews', {
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
  guestName: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
    allowNull: true,
    defaultValue: "5"
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "Reviews",
  timestamps: true,
});

export default Reviews;