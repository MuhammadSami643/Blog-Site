import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { _id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/${_id}`);
        setBlog(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch blog. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [_id]);

  const handleEdit = () => {
    navigate(`/edit/${_id}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-md"></div>
        <div className="relative flex flex-col items-center justify-center p-6 bg-transparent">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center mt-8">Blog not found.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Blogs
        </button>

        {/* Blog Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Blog Image */}
        {blog.image && (
          <div className="mb-8">
            <img
              src={`http://localhost:3000${blog.image}`}
              alt="Blog visual"
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-md"
            />
          </div>
        )}

        {/* Content */}
        {/* Blog Content */}
        <div className="mb-10">
          <div className="w-full max-w-full overflow-hidden break-words prose prose-lg prose-blue text-gray-800">
            <p>{blog.content}</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-700">Category:</span>{" "}
            {blog.category}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Tags:</span>{" "}
            {blog.tags}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Published:</span>{" "}
            {new Date(blog.date).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Author:</span>{" "}
            {blog.author}
          </p>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-200 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
