import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "mysql",
    logging: false,
});

export default sequelize;
