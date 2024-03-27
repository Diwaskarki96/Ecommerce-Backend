const cartModel = require("./cart.model");

const add = async (payload) => {
  return await cartModel.create(payload);
};
const findById=async()=>{}


module.exports = { add };
