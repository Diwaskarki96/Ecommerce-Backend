const mongoose = require("mongoose");
const { isBuyer } = require("../../middleware/authorization");
const {
  addItemToCartValidation,
  updateCartValidation,
} = require("./cart.validation");
const productController = require("../products/product.controller");
const cartController = require("./cart.controller");
const cartModel = require("./cart.model");
const isValidMongoId = require("../../middleware/validateMongoID");
const productModel = require("../products/product.model");
const validateReqBody = require("../../middleware/reqBodyValidation");

const router = require("express").Router();

router.post("/add", isBuyer, async (req, res, next) => {
  try {
    const cartData = req.body;
    const validateData = await addItemToCartValidation.validate(cartData);
    const isValidMongoId = mongoose.isValidObjectId(cartData.productId);
    if (!isValidMongoId) throw new Error("Invalid Product ID");
    const product = await productController.findId({ id: cartData.productId });
    if (!product) throw new Error("Product not found!");
    if (cartData.orderQuantity > product.availableQuantity)
      throw new Error("Order  quantity exceeds available quantity.");

    //buyer cannot add cart twice in product after doing one time. buyer should go to add to cart to increase card
    const cartItem = await cartModel.findOne({
      buyerId: req.loggedInUserId,
      productId: cartData.productId,
    });
    if (cartItem) throw new Error("This item already in your cart.");
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

router.delete("/clear", isBuyer, async (req, res, next) => {
  try {
    const loggedInUserId = req.loggedInUserId;
    const deleteCart = await cartModel.deleteMany({ buyerId: loggedInUserId });
    res.json({ msg: "clear is working", data: deleteCart });
  } catch (e) {
    next(e);
  }
});

//-------delete cart by id-------
router.delete(
  "/delete/:id",
  isBuyer,
  isValidMongoId,
  async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await productController.findId({ id: productId });
      if (!product) {
        return res.status(401).json({ msg: "Product does not exist" });
      }
      const deletedCart = await cartModel.deleteOne({
        buyerId: req.loggedInUserId,
        productId: productId,
      });
      res.json({ msg: "Success", deletedCart });
    } catch (e) {
      next(e);
    }
  }
);

//----------cart increase and decrease ---------
router.put(
  "/edit/:id",
  isBuyer,
  isValidMongoId,
  validateReqBody(updateCartValidation),
  async (req, res, next) => {
    try {
      //extract action form req.body
      const actionData = req.body;

      //find product
      const productId = req.params.id;
      const buyerId = req.loggedInUserId;
      const product = await productController.findId({ id: productId });
      if (!product) {
        return res.status(400).send("Product does not exits");
      }
      const productAvailableQuantity = product?.availableQuantity;
      //find cart
      const cartItem = await cartModel.findOne({
        buyerId: buyerId,
        productId: productId,
      });

      //if not cart item, throw error
      if (!cartItem) {
        return res.status(404).json({ msg: "Cart item does not Exists" });
      }
      //previous ordered quantity from cart item
      let previousOrderedQuantity = cartItem.orderQuantity;

      let newOrderedQuantity;

      if (actionData.action === "inc") {
        newOrderedQuantity = previousOrderedQuantity + 1;
      } else {
        newOrderedQuantity = previousOrderedQuantity - 1;
      }

      if (newOrderedQuantity < 1) {
        return res.status(403).json({ msg: "Order quantity cannot be zero" });
      }
      if (newOrderedQuantity > productAvailableQuantity) {
        return res
          .status(403)
          .json({ msg: "Product reached available quantity" });
      }
      // update cart item with new ordered quantity
      const incOrDecQuantity = await cartModel.updateOne(
        {
          buyerId,
          productId,
        },
        { orderQuantity: newOrderedQuantity }
      );
      res.json({ msg: "success", data: incOrDecQuantity });
    } catch (e) {
      next(e);
    }
  }
);

//--------------view all carts including pagination-------
router.get("/list", isBuyer, async (req, res) => {
  // extract buyerId from req.loggedInUserId
  const buyerId = req.loggedInUserId;

  const cartData = await Cart.aggregate([
    {
      $match: {
        buyerId: buyerId,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $project: {
        name: { $first: "$productDetails.name" },
        brand: { $first: "$productDetails.brand" },
        unitPrice: { $first: "$productDetails.price" },
        image: { $first: "$productDetails.image" },
        orderedQuantity: 1,
      },
    },
  ]);

  return res.status(200).send({ message: "success", cartData: cartData });
});

router.put("/");

module.exports = router;
