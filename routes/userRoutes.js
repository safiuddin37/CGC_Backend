const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const router = express.Router();
router.get("/", userCtrl.getUsers);
router.post("/adduser", userCtrl.addUser);
router.patch("/updateuser/:id", userCtrl.updateUser);
router.put("/updateuser/:id", userCtrl.updateCompUser);
router.delete("/deleteuser/:id", userCtrl.deleteUser);
router.get("/signin", userCtrl.signin)
module.exports = router;
