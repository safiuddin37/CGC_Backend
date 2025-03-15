const express = require("express");
const booksRoutes = require("./bookroutes");
const productRoutes = require("./productRoutes");
const router = express.Router();
router.use("/books", booksRoutes);
router.use("/products", productRoutes);
module.exports = router;