const router = require("express").Router();
const { signup, login } = require("../Controller/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../MidlleWare/AuthValidator");

//first one is the url route, second is the middle ware for validation and third is controller
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
