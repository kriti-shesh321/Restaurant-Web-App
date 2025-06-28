import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/database.js";

const User = sequelize.define('User', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "email"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: "googleId"
  },
  profileImage: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('staff', 'customer'),
    allowNull: false,
    defaultValue: "customer"
  },
}, {
  tableName: "User",
  timestamps: true,
});

User.beforeSave(async (user) => {
  if (user.changed("password") && user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

export default User;