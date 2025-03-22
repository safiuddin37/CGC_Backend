const userModel = require("../models/userModel");
const {
  responseObjGenerator,
  hashPassword,
  comparePassword,
} = require("../utils/utils");
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const addUser = async (req, res) => {
  try {
    const data = req.body;
    data.password = await hashPassword(data.password);
    const user = new userModel(data);
    await user.save();
    let resObj = responseObjGenerator(true, "User Added Successfully!", user);
    res.status(201).json(resObj);
  } catch (e) {
    console.error(e);
    if (e.code === 11000 && e.keyValue && e.keyValue.email) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exists!" });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const user = await userModel.findOneAndUpdate({ _id: userId }, data, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }
    let resObj = responseObjGenerator(true, "User Updated Successfully!", user);
    res.status(200).json(resObj);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const updateCompUser = async (req, res) => {
  try {
    const userId = req.params.id;
    let data = req.body;
    if (data.password) {
      data.password = await hashPassword(data.password); // Hash password if updated
    }
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: data },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }
    let resObj = responseObjGenerator(true, "User Updated Successfully!", user);
    res.status(200).json(resObj);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    const result = await userModel.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }
    let resObj = responseObjGenerator(true, "User Deleted Successfully!");
    res.status(200).json(resObj);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json(responseObjGenerator(false, "Invalid Email or Password!"));
    }
    const isPasswordMatches = await comparePassword(password, user.password);
    if (!isPasswordMatches) {
      return res
        .status(400)
        .json(responseObjGenerator(false, "Invalid Email or Password!"));
    }
    // const token = generateToken({ email, name: user.name, id: user._id, userRole: user.userRole });
    res.status(200).json({
      success: true,
      message: "User Logged in Successfully!",
      data: {
        name: user.name,
        email: user.email,
        _id: user._id,
        // token,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  updateCompUser,
  deleteUser,
  signin,
};
