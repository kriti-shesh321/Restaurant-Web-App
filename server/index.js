import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import deliveryAddressRoutes from "./routes/deliveryAddressRoutes.js";
import menuCategoryRoutes from "./routes/menuCategoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import restaurantSettingsRoutes from "./routes/restaurantSettingsRoutes.js";

dotenv.config();

const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/addresses', deliveryAddressRoutes);
app.use('/api/v1/menu-category', menuCategoryRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/restaurant', restaurantSettingsRoutes);

const start = async () => {
  try {
      //connect to DB
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  } catch (error) {
      console.log(error);
  }
};

start();