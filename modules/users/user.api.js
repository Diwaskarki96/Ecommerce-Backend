const router = require("express").Router();
const userController = require("./user.controller");
const { userValidation, loginValidation } = require("./user.validation");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const validateData = await userValidation.validate(data);
    const existedUser = await userController.findByEmail({
      email: req.body.email,
    });
    if (existedUser) throw new Error("User existed");
    const user = await userController.register(validateData);
    res.send({ msg: "success", data: user });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const validateData = await loginValidation.validate(data);
    const user = await userController.login(validateData);
    const token = jwt.sign(
      { email: validateData.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_DURATION,
      }
    );
    res.send({ msg: "success", data: user, token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
