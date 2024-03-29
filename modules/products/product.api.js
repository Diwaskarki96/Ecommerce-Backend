const router = require("express").Router();
const productController = require("./product.controller");
const {
  productValidation,
  paginationValidation,
} = require("./product.validation");
const { isSeller, isBuyer, isUser } = require("../../middleware/authorization");
const isValidMongoId = require("../../middleware/validateMongoID");
const productModel = require("./product.model");
const validateReqBody = require("../../middleware/reqBodyValidation");

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

router.delete(
  "/delete/:id",
  isSeller,
  isValidMongoId,
  async (req, res, next) => {
    try {
      const productId = req.params.id;

      const product = await productController.findId({ id: productId });
      if (!product) throw new Error("Product does not exist");

      const sellerId = product.sellerId;
      const loggedInUserId = req.loggedInUserId;

      const isOwnerOfProduct = sellerId.equals(loggedInUserId);
      if (!isOwnerOfProduct)
        throw new Error("You are not the owner of this product");
      const deleteProduct = await productController.remove({ id: productId });
      res.json({ msg: "success", data: deleteProduct });
    } catch (e) {
      next(e);
    }
  }
);

//edit
router.put("/edit/:id", isSeller, isValidMongoId, async (req, res, next) => {
  try {
    const data = req.body;
    const validateProduct = await productValidation.validate(data);
    const productId = req.params.id;
    const product = await productController.findId({ id: productId });
    if (!product) throw new Error("Product Does Not Exist!");

    const sellerId = product.sellerId;
    const loggedInUserId = req.loggedInUserId;

    const isOwnerOfProduct = sellerId.equals(loggedInUserId);
    if (!isOwnerOfProduct)
      throw new Error("You are not the owner of this product");
    const updateProduct = await productController.updateById(
      productId,
      validateProduct,
      { new: true }
    );
    res.json({ msg: "success", data: updateProduct });
  } catch (e) {
    next(e);
  }
});

//list all product by buyer
router.get(
  "/productList/buyer",
  isBuyer,
  validateReqBody(paginationValidation),
  async (req, res, next) => {
    try {
      const { limit, page } = req.body;
      const skip = (page - 1) * limit;

      const product = await productModel.aggregate([
        { $match: {} },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            name: 1,
            band: 1,
            price: 1,
            category: 1,
            freeShipping: 1,
            availableQuantity: 1,
            image: 1,
          },
        },
      ]);
      res.json({ msg: "success", data: product });
    } catch (e) {
      next(e);
    }
  }
);

//list all product by seller
router.get(
  "/productList/seller",
  isSeller,
  validateReqBody(paginationValidation),
  async (req, res, next) => {
    try {
      const { limit, page } = req.body;
      const skip = (page - 1) * limit;
      const allProducts = await productModel.aggregate([
        { $match: { sellerId: req.loggedInUserId } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            sellerId: 0,
            _id: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      ]);
      res.json({ msg: "success", data: allProducts });
    } catch (e) {
      next(e);
    }
  }
);
module.exports = router;
