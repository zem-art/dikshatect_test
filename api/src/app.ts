import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./database/migrations";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import { seedDatabase } from "./database/seeders";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

sequelize.sync({ force: true }).then(async () => {
  console.log("Database connected");
  // await seedDatabase();
});

export default app;
