const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  buyerId: { type: mongoose.ObjectId, ref: "users", required: true },
  productId: { type: mongoose.ObjectId, ref: "products", required: true },
  orderQuantity: { type: Number, required: true, min: 1 },
});
const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
