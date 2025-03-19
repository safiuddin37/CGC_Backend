const userModel = require("../models/userModel");
const { responseObjGenerator, hashPassword ,comparePassword } = require("../utils/utils");

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
};
const addUser = async (req, res) => {
  try {
    const data = req.body;
    data.password = await hashPassword(data.password);
    const user = new userModel(data);
    await user.save();
    let resObj = responseObjGenerator(true, "User Added Successfully!", user);
    res.status(201).json(resObj);
  } catch (err) {
    if (err.errorResponse.errmsg.includes("duplicate key")) {
      res
        .status(400)
        .json({ message: "Email Already Exists!", success: false });
    } else {
      res
        .status(500)
        .json({ message: "Internal Server Error!", success: false });
    }
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const user = await userModel.findOneAndUpdate({ _id: userId }, data, {
      new: true,
    });
    // const prd = await ProductModel.findOne({ _id: productId });
    let resObj = responseObjGenerator(true, "User Updated Successfully!", user);
    res.status(200).json(resObj);
  } catch (e) {
    console.log(e);
    let resObj = responseObjGenerator(false);
    res.status(500).json(resObj);
  }
};

const updateCompUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const user = await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          name: data.name,
          email: data.email,
          password: data.password,
          usertype: data.usertype,
        },
      },
      { new: true }
    );
    let resObj = responseObjGenerator(true, "User Updated Successfully!", user);
    res.status(200).json(resObj);
  } catch (e) {
    console.log(e);
    let resObj = responseObjGenerator(false);
    res.status(500).json(resObj);
  }
};
const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    await userModel.deleteOne({ _id: userId });
    let resObj = responseObjGenerator(true, "User Deleted Successfully!");
    res.status(200).json(resObj);
  } catch (e) {
    console.log(e);
    let resObj = responseObjGenerator(false);
    res.status(500).json(resObj);
  }
};
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email, password: password });
    if (user) {
      const isPasswordMatches = await comparePassword(password, user.password);
      if (isPasswordMatches) {
        // const token = generateToken({ email, name: user.name, id: user._id, userRole: user.userRole });
        return res.status(200).json({
          message: "User Loggedin Successfully!",
          success: true,
          data: {
            name: user.name,
            email: user.email,
            _id: user._id,
            // token,
          },
        });
      }
    } else {
      let resObj = responseObjGenerator(false, "Invalid Email or Password!");
      res.status(400).json(resObj);
    }
  } catch (e) {
    console.log(e);
    let resObj = responseObjGenerator(false);
    res.status(500).json(resObj);
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
