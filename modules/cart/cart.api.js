const mongoose = require("mongoose");
const { isBuyer } = require("../../middleware/authorization");
const addItemToCartValidation = require("./cart.validation");
const productController = require("../products/product.controller");
const cartController = require("./cart.controller");
const cartModel = require("./cart.model");

const router = require("express").Router();

router.post("/add", isBuyer, async (req, res, next) => {
  try {
    const cartData = req.body;
    console.log(cartData);
    const validateData = await addItemToCartValidation.validate(cartData);
    const isValidMongoId = mongoose.isValidObjectId(cartData.productId);
    if (!isValidMongoId) throw new Error("Invalid Product ID");
    const product = await productController.findId({ id: cartData.productId });
    if (!product) throw new Error("Product not found!");
    console.log(product);
    if (cartData.orderQuantity > product.availableQuantity)
      throw new Error("Order  quantity exceeds available quantity.");
    console.log(req.loggedInUserId);
    // const createCart = await cartController.add(validateData);
    const createCart = await cartModel.create({
      buyerId: req.loggedInUserId,
      productId: cartData.productId,
      orderQuantity: cartData.orderQuantity,
    });
    res.json({ msg: "success", data: createCart });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
