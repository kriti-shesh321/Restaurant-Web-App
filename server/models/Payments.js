import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payments = sequelize.define("Payments", {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: "Orders",
            key: "id",
        },
        onDelete: "CASCADE",
    },

    provider: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "stripe",
    },

    providerPaymentId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },

    status: {
        type: DataTypes.ENUM(
            "pending",
            "processing",
            "succeeded",
            "failed",
            "canceled"
        ),
        allowNull: false,
        defaultValue: "pending",
    },

    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: "usd",
    },
},
    {
        tableName: "Payments",
        timestamps: true,
    }
);

export default Payments;