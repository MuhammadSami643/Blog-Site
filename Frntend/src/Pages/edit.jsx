import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { handleSuccess } from "../components/toast";
import { ToastContainer } from "react-toastify";

const EditBlog = () => {
  const { _id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    date: "",
    author: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch blog details from the backend
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/${_id}`);
        setBlog(response.data.data); // Set the fetched blog data to state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch blog. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [_id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only include the fields that should be updated
      const updatedBlog = {
        title: blog.title,
        content: blog.content,
        category: blog.category,
        tags: blog.tags,
        date: blog.date,
        author: blog.author,
      };

      // Send a PUT request to the correct endpoint
      const response = await axios.put(
        `http://localhost:3000/blog/update/${_id}`, // Use template literal for cleaner syntax
        updatedBlog,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the request was successful
      if (response.status === 200) {
        navigate(`/blog/${_id}`); // Redirect to the blog detail page after editing
        return handleSuccess("Blog Updated Successfully");
      } else {
        setError("Failed to update blog. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("Failed to update blog. Please try again later.");
    }
  };
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center mt-8">Blog not found.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl bg-gradient-to-r from-blue-240 to-blue-180">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={blog.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Content Field */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              value={blog.content}
              onChange={handleChange}
              rows="6"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Category Field */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={blog.category}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Tags Field */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={blog.tags}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Author Field */}
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={blog.author}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Save Changes
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditBlog;
