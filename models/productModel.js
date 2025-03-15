const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    price: { type: Number, required: true },
    discountType: { type: String },
    discount: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);