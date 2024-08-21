import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import registerRoutes from './routes/registerRoutes.js'
import loginRoutes from './routes/loginRoutes.js'
import cors from "cors";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();
const Port = process.env.PORT;

// dataBase COnnection
connectDB();
// use middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use("/products", productRoutes);
app.use("/register",registerRoutes);
app.use("/login",loginRoutes);


// Listening server
app.listen(Port, () => {
  console.log(`Server is running on port:${Port}`);
});
