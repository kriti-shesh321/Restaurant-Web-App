import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DeliveryAddresses =  sequelize.define('DeliveryAddresses', {
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
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Home','Work','Other'),
      allowNull: true,
      defaultValue: "Home"
    }
  }, {
    tableName: 'DeliveryAddresses',
    timestamps: true,
  });

export default DeliveryAddresses;