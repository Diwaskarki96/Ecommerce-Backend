const YUP = require("yup");

const addItemToCartValidation = YUP.object({
  productId: YUP.string().required("Product ID is required").trim(),
  orderQuantity: YUP.number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1"),
});

const updateCartValidation = YUP.object({
  action: YUP.string().required("Action is required").oneOf(["inc", "dec"]),
});
module.exports = { addItemToCartValidation, updateCartValidation };
