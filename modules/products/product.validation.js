const YUP = require("yup");

const productValidation = YUP.object({
  name: YUP.string()
    .required("name is required")
    .min(3, "Name must be min 3")
    .max(60, "Name must be max 60")
    .trim(),
  brand: YUP.string()
    .required("Brand is required")
    .min(3, "Name must be min 3")
    .max(60, "Name must be max 60")
    .trim(),
  price: YUP.number()
    .required("Price is required")
    .min(0, "Price must be min 1")
    .positive("Price must be positive"),
  category: YUP.string()
    .required("Category is required")
    .oneOf([
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
    ]),

  freeShipping: YUP.boolean(),
  availableQuantity: YUP.number()
    .required("Available quantity is required")
    .min(1, "Must have at least one in stock")
    .positive("Quantity must be in positive")
    .integer(),
  description: YUP.string()
    .required("Description is required")
    .min(5, "Description must be atleast 5 characters")
    .max(1000, "Description must be under 1000 characters"),
  image: YUP.string(),
});

const paginationValidation = YUP.object({
  page: YUP.number()
    .required("Page is required")
    .min(1, "Page must be atleast 1")
    .positive(),
  limit: YUP.number().required("Limit is required").positive(),
});

module.exports = { productValidation, paginationValidation };
