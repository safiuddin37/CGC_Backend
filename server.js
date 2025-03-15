const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.listen(5000, () => console.log("Server is Up & Running!"));

app.use(express.json());

app.use("/api/v1/", require("./routes/routes"));

mongoose
  .connect("mongodb://localhost:27017/productdb")
  .then(() => console.log("DB Connected to Server!"))
  .catch((err) => console.log(err));