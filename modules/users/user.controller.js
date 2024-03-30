const userModel = require("./user.model");
const bcrypt = require("bcryptjs");

const register = async (payload) => {
  const salt = await bcrypt.genSalt(process.env.SALT_URL);
  payload.password = await bcrypt.hash(payload.password, salt);
  return await userModel.create(payload);
};
const findByEmail = async ({ email }) => {
  return await userModel.findOne({ email });
};

const login = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");
  const isMactch = await bcrypt.compare(password, user.password);
  if (!isMactch) throw new Error("Invalid credentials");
  return user;
};

module.exports = { register, findByEmail, login };
