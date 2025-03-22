import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../components/toast";

const Create = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      image: null,
      content: "",
      category: "Technology",
      tags: "",
      date: "",
      author: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test(
          "fileType",
          "Only image files are allowed (JPEG, PNG, GIF)",
          (value) => {
            if (!value) return false;
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            return validTypes.includes(value.type);
          }
        ),
      content: Yup.string().required("Content is required"),
      category: Yup.string().required("Category is required"),
      tags: Yup.string().required("Tags are required"),
      date: Yup.date().required("Publish date is required"),
      author: Yup.string().required("Author is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(
          key,
          key === "date" ? new Date(value).toISOString() : value
        );
      });

      try {
        const response = await axios.post(
          "http://localhost:3000/blog/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          navigate("/home");
          console.log(response);
          handleSuccess("Blog uploaded successfully");
          resetForm();
        }
      } catch (error) {
        handleError("Failed to upload blog post. Please try again.", error);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Upload Blog Post
        </h1>

        {/* Input Field Generator */}
        {[
          {
            name: "title",
            type: "text",
            placeholder: "Enter blog title",
            label: "Title",
          },
          {
            name: "tags",
            type: "text",
            placeholder: "Enter tags (comma separated)",
            label: "Tags",
          },
          { name: "date", type: "date", label: "Date" },
          {
            name: "author",
            type: "text",
            placeholder: "Enter author name",
            label: "Author",
          },
        ].map(({ name, type, placeholder = "", label }) => (
          <div className="mb-5" key={name}>
            <label
              htmlFor={name}
              className="block font-semibold text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 ${
                formik.touched[name] && formik.errors[name]
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-sm text-red-500 mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}

        {/* Image Upload */}
        <div className="mb-5">
          <label
            htmlFor="image"
            className="block font-semibold text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 ${
              formik.touched.image && formik.errors.image
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.image}</p>
          )}
        </div>

        {/* Content Field */}
        <div className="mb-5">
          <label
            htmlFor="content"
            className="block font-semibold text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="6"
            placeholder="Write your blog content here..."
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formik.touched.content && formik.errors.content
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {formik.touched.content && formik.errors.content && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.content}</p>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 ${
              formik.touched.category && formik.errors.category
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.category}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200">
            Upload Blog
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Create;
