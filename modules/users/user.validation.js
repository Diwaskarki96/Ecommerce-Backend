const YUP = require("yup");

const userValidation = YUP.object({
  firstName: YUP.string()
    .required("Fiest name is required")
    .min(2, "First name is too short")
    .max(50, "First Name is too long")
    .trim(),
  lastName: YUP.string()
    .required("Last name is required")
    .min(2, "Last name is too short")
    .max(50, "Last Name is too long")
    .trim(),
  email: YUP.string().email("Invalid Email").required("Email is required"),
  password: YUP.string().required("Password is required"),
  role: YUP.string()
    .required("Role is required")
    .oneOf(["buyer", "seller"], "Role must be buyer or seller"),
  gender: YUP.string().oneOf(
    ["male", "female"],
    "Gender must be male  or female"
  ),
});
const loginValidation = YUP.object({
  email: YUP.string()
    .email("Invalid Email")
    .required("Email is required")
    .lowercase(),
  password: YUP.string().required("Password is required"),
});

module.exports = { userValidation, loginValidation };
