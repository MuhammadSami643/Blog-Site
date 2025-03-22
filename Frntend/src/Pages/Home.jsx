import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blog/getAll");
        setBlogs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchTerm = search.toLowerCase();

    if (searchTerm === "") {
      return true;
    }
    return (
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.category.toLowerCase().includes(searchTerm) ||
      blog.tags.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm)
    );
  });

  const handleBlogClick = (_id) => {
    navigate(`/blog/${_id}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-md"></div>

        <div className="relative flex flex-col items-center justify-center p-6 bg-transparent ">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 py-12">
      <h1 className="text-5xl font-bold text-blue-500 text-center mb-6">
        Blog Posts
      </h1>

      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search blogs by title, tags, category or author..."
            className="w-full p-3 rounded-full border border-blue-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black-700 placeholder-black-400"
          />
        </div>
      </div>

      <div className="container mx-auto px-15">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15 ">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => handleBlogClick(blog._id)}
              className="rounded-2xl shadow-2xl hover:shadow-3xl cursor-pointer bg-gradient-to-r from-blue-300 via-blue-200 to-blue-200 transition-transform duration-300 hover:scale-105">
              <div className="mb-4">
                <img
                  src={`http://localhost:3000${blog.image}`} // No double slash
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 "
                />
              </div>
              <h2 className="text-2xl pl-3 font-bold text-gray-900 mb-4">
                {blog.title}
              </h2>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 pl-3">
                  <span className="font-semibold">Category:</span>{" "}
                  <span className="text-blue-600">{blog.category}</span>
                </p>
                <p className="text-sm text-gray-500 pt-0 p-3 ">
                  <span className="font-semibold">Author:</span>{" "}
                  <span className="text-blue-600">{blog.author}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
