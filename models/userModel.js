const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: String, required: true },
    password: { type: String, required: true },
    usertype: {
      type: String,
      Enum: ["admin", "vendor", "user"],
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);