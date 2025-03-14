const express = requires("express");
const router = express.Router();
const bookCtrl = require("../controllers/bookctrl");
router.post("/create",bookctrl.createbook);
module.exports = router;