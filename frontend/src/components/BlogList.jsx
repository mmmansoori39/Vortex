import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";

const BlogList = () => {
  const { blog: blogs, fetchAllBlogs, isLoading, error } = useBlogStore();

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 mt-28">
        {/* Skeleton Loading UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-[#0b1b29] p-4 rounded shadow animate-pulse">
              <div className="bg-gray-300 h-48 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-[#ff9800] rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <p>Error: {error}</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className=" lg:w-3/4 container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center">Blog Posts</h1>
      <Link
        to="/create/blog"
        className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-sm border-2 border-[#ff9800] shadow-lg text-white"
      >
        Create New Blog
      </Link>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#0b1b29] p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={blog.img || "https://via.placeholder.com/400"} // Fallback image
                alt={blog.title}
                className="w-full h-48 object-cover rounded"
              />
              <div className="flex justify-between pt-2 text-sm font-extralight text-slate-400 *:border *:rounded *:px-2 *:border-slate-700">
                <p>{formatDate(blog.date)}</p>
                <p>{blog.types}</p>
              </div>
              <h2 className="text-xl font-semibold mt-2">{blog.title}</h2>
              <p className="text-gray-600 mb-3 mt-1">
                {blog.description.substring(0, 40)}...
              </p>
              <Link
                to={`/blog/${blog._id}`}
                className="text-cyan-500 hover:text-cyan-600 focus:outline-none focus:text-cyan-200 py-1 px-2 rounded-lg text-md border-2 border-[#ff9800] shadow-lg block text-center mt-2"
              >
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
