const express = require("express");
const booksRoutes = require("./bookroutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const router = express.Router();
router.use("/books", booksRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);
module.exports = router;
