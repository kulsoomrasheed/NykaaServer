
const express = require("express");
const { Products } = require("../model");

const axisRouter = express.Router();

axisRouter.post("/products", async (req, res) => {
  try {
    const products = req.body; // Assuming req.body is an array of products
    const insertedProducts = await Products.insertMany(products);
    res.json({
      message: "Products added successfully",
      data: insertedProducts,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error adding products", error: error.message });
  }
});

axisRouter.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({ msg: products });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
});

module.exports = { axisRouter };
