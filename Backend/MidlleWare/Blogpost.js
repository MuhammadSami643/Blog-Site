const joi = require("joi");

const BlogValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().min(3).max(200).required(),
    content: joi.string().min(50).max(2000).required(),
    category: joi.string().required(),
    tags: joi.string().min(3).max(200).required(),
    date: joi.date().iso().required(),
    author: joi.string().min(3).max(100).required(),
  });

  //validate is a function which validate the data in the request
  //destructure that if error exist ?
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Sorry, Something Went Wrong",
      error,
    });
  }
  next();
};

module.exports = BlogValidation;
