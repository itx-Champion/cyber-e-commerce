import express from "express";
import product from "../schemas/ProductSchema.js";

const router = express.Router();

//? Routes showing all Products
router.get("/", async (req, resp) => {
  try {
    const products= await product.find();
    resp.send(products);
  } catch (error) {
    console.log("Error in Fetching Product");
  }
});

export default router;
