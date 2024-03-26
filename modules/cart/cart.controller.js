const cartModel = require("./cart.model");

const add = async (payload) => {
  return await cartModel.create(payload);
};

module.exports = { add };
