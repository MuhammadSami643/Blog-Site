const mongoose = require("mongoose");

const BlogSchema = require("../Schema/blogpost");

const BlogModel = mongoose.model("blogpost", BlogSchema);

module.exports = BlogModel;
