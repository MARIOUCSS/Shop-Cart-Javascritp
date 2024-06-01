const express = require("express");
const {
  GetProducts,
  GetProductOne,
} = require("../Controllers/ProductsControllers");
const router = express.Router();

//Products
router.get("/products", GetProducts);
router.get("/products/:id", GetProductOne);
module.exports = router;
