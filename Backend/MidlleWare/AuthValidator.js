const joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(50).required(),
  });

  //validate is a function which validate the data in the request
  //destructure that if error exist ?
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Sorry, Bad Request",
      error,
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(50).required(),
  });

  //validate is a function which validate the data in the request
  //destructure that if error exist ?
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Sorry, Bad Request",
      error,
    });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
