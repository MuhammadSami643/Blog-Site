const BlogModel = require("../Models/Blog");

const create = async (req, res) => {
  try {
    const { title, content, category, tags, date, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Get image path from multer

    // Check if a blog with the same title already exists
    const existingBlog = await BlogModel.findOne({ title });
    if (existingBlog) {
      return res.status(409).json({
        message: "Blog with this title already exists",
        success: false,
      });
    }

    const blogModel = new BlogModel({
      title,
      image, // Use the file path from multer
      content,
      category,
      tags,
      date: new Date(date), // Ensure date is parsed correctly
      author,
    });

    await blogModel.save();

    res.status(201).json({
      message: "Blog Uploaded Successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error in create blog:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const update = async (req, res) => {
  try {
    const _id = req.params._id;
    const { title, content, category, tags, date, author } = req.body;

    // Prepare update object
    const updateData = {
      title,
      content,
      category,
      tags,
      date: new Date(date),
      author,
    };

    const updatedBlog = await BlogModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({}).sort({ date: -1 });
    res.status(200).json({
      message: "Blogs fetched successfully",
      success: true,
      data: blogs,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { _id } = req.params;
    const blog = await BlogModel.findById(_id); // Find blog by ID
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Blog fetched successfully",
      success: true,
      data: blog,
    });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  create,
  update,
  getAllBlogs,
  getBlogById,
};
