const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    brand: { type: String, required: true, trim: true, maxlength: 60 },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      tim: true,
      enum: [
        "grocery",
        "eletronic",
        "electrical",
        "kitchen",
        "kids",
        "sports",
        "clothes",
        "shoes",
        "furniture",
        "pharma",
        "stationery",
        "cosmetic",
      ],
    },
    freeShipping: { type: Boolean, default: false },
    sellerId: { type: mongoose.ObjectId, ref: "users", required: true },
    availableQuantity: { type: Number, min: 1, required: true },
    description: { type: String, required: true, min: 5, maxlength: 1000 },
    image: { type: String, required: false, default: null },
  },
  {
    timestamps: true,
  }
);
const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
