
const express = require("express");
const { Products, Cart ,Wishlist} = require("../model/model");
const { auth } = require("../middlewares/auth.middleware");

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



axisRouter.post("/cart", async (req, res) => {
  const products= req.body; // Assuming req.body is an array of products

  try {
    console.log(products);
    const insertedProducts = new Cart(products);
    const savedProduct = await insertedProducts.save();
    res.json({
      message: "Product added to Cart successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(404).json({ message: "Error adding products", error: error.message });
  }
});

axisRouter.get("/cart", async (req, res) => {
  try {
    const products = await Cart.find();
    res.status(200).json({ msg: products });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
});

axisRouter.delete("/cart/:id", async (req, res) => {
  const id= req.params.id
 // console.log(id);
  try{
const deleteProduct = await Cart.findByIdAndDelete(id)
res.status(200).json({msg:`The product with the ${id} is deleted` })
  }catch (err) {
    res.status(404).json({ msg: err.message });

  }
})


axisRouter.post("/wishlist", async (req, res) => {
  const products= req.body; // Assuming req.body is an array of products

  try {
    console.log(products);
    const insertedProducts = new Wishlist(products);
    const savedProduct = await insertedProducts.save();
    res.json({
      message: "Product added to Cart successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(404).json({ message: "Error adding products", error: error.message });
  }
});

axisRouter.get("/wishlist", async (req, res) => {
  try {
    const products = await Wishlist.find();
    res.status(200).json({ msg: products });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
});

axisRouter.delete("/wishlist/:id", async (req, res) => {
  const id= req.params.id
 // console.log(id);
  try{
const deleteProduct = await Wishlist.findByIdAndDelete(id)
res.status(200).json({msg:`The product with the ${id} is deleted` })
  }catch (err) {
    res.status(404).json({ msg: err.message });

  }
})
module.exports = { axisRouter };
