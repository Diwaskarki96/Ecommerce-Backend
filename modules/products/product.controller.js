const productModel = require("./product.model");

const add = async (payload) => {
  return await productModel.create(payload);
};
const all = async (req, res) => {
  return await productModel.find();
};
const remove = async () => {};

const findId = async ({ id }) => {
  return await productModel.findById({ _id: id });
};
module.exports = { add, remove, all, findId };
