const router = require("express").Router();
const {
  create,
  update,
  getAllBlogs,
  getBlogById,
} = require("../Controller/blogpost");
const BlogValidation = require("../MidlleWare/Blogpost");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`); //With the help of this every image stored uniquely, TimeStamps added with original name whenever we upload a file
  },
});

const upload = multer({ storage: storage });

//first one is the url route, second is the middle ware for validation and third is controller
router.post("/create", upload.single("image"), BlogValidation, create);
router.put("/update/:_id", BlogValidation, update);
router.get("/getAll", getAllBlogs);
router.get("/:_id", getBlogById);

module.exports = router;
