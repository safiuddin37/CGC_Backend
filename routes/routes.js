const express = requires("express");

const router = express.Router();
router.use("/books", bookRoutes);
module.exports = router;
