const router = require("express").Router();
const productController = require("./product.controller");
const productValidation = require("./product.validation");
const { isSeller, isBuyer, isUser } = require("../../middleware/authorization");
const { default: mongoose } = require("mongoose");
const isValidMongoId = require("../../middleware/validateMongoID");

router.get("/all", async (req, res, next) => {
  try {
    const allProducts = await productController.all();
    res.json({ msg: "success", data: allProducts });
  } catch (e) {
    next(e);
  }
});
router.post("/add", isSeller, async (req, res, next) => {
  try {
    const newProduct = req.body;
    const validateData = await productValidation.validate(newProduct);
    const loggedInUserId = req.loggedInUserId;
    newProduct.sellerId = loggedInUserId;
    const product = await productController.add(validateData);
    res.json({ msg: "success", data: product });
  } catch (e) {
    next(e);
  }
});

router.get("/details/:id", isUser, isValidMongoId, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await productController.findId({ id: productId });
    if (!product) throw new Error("No Product Found");
    res.json({ msg: "Success", data: product });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
