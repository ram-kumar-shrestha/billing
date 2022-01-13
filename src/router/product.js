const express = require("express");
const router = new express.Router();
const Product = require("../model/product");
const auth = require("../middleware/auth");
// add a product
router.post("/products", auth, async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// read all products
router.get("/products", auth, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// read a product
router.get("/products/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Item not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json();
  }
});

// update a product
router.patch("/products/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "rate", "description"];

  const isValidUpdates = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdates)
    return res.status(400).json({ error: "Invalid Operation" });

  try {
    //   custom update to validate allowed update key->  value pair
    const product = await Product.findById(req.params.id);
    updates.forEach((update) => (product[update] = req.body[update]));

    await product.save();

    // const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    // new: true,
    // runValidators: true,
    // });

    if (!product) res.status(404).json({ error: "Item not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a product
router.delete("/products/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Item not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
