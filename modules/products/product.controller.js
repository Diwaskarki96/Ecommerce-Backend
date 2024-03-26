const productModel = require("./product.model");

const add = async (payload) => {
  return await productModel.create(payload);
};
const all = async () => {
  return await productModel.find();
};
const remove = async ({ id }) => {
  return await productModel.deleteOne({ _id: id });
};

const findId = async ({ id }) => {
  return await productModel.findById({ _id: id });
};

const updateById = async (id, payload) => {
  return await productModel.findByIdAndUpdate(id, payload, { new: true });
};

module.exports = { add, remove, all, findId, updateById };
