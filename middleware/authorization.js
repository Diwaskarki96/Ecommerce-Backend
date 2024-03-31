const jwt = require("jsonwebtoken");
const userController = require("../modules/users/user.controller");

const isSeller = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const splittedValue = authorization?.split(" ");
    const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
    if (!token) throw new Error("Unauthorized");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userController.findByEmail({ email: payload.email });
    if (!user) throw new Error("User not found");
    if (user.role !== "seller") throw new Error("Unauthorized");
    req.loggedInUserId = user._id;
    next();
  } catch (e) {
    next(e);
  }
};

const isBuyer = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const splittedValue = authorization?.split(" ");
    const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
    if (!token) throw new Error("Unauthorized");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userController.findByEmail({ email: payload.email });
    if (!user) throw new Error("User not found");
    if (user.role !== "buyer") throw new Error("Unauthorized");
    req.loggedInUserId = user._id;
    next();
  } catch (e) {
    next(e);
  }
};

const isUser = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const splittedValue = authorization?.split(" ");
    const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
    if (!token) throw new Error("Unauthorized");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userController.findByEmail({ email: payload.email });
    if (!user) throw new Error("User not found");
    req.loggedInId = req._id;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { isBuyer, isSeller, isUser };
