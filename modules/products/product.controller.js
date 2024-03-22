const productModel = require("./product.model");

const add = async (payload) => {
  return await productModel.create(payload);
};
const all = async (req, res) => {
  return await productModel.find();
};
const remove = async () => {};
module.exports = { add, remove, all };
