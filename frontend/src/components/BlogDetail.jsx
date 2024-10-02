// src/components/BlogDetail.js
import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";

const BlogDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const { blog, fetchBlog, deleteBlog, isLoading, error } = useBlogStore(); 

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        await fetchBlog(id);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchSingleBlog();
  }, [id, fetchBlog]);

  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      navigate("/blog");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No blog found</div>; 

  return (
    <div className="container lg:w-3/4 mx-auto px-4 pt-20 pb-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img
        src={blog.img}
        alt={blog.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-600 mb-4">{blog.description}</p>
      <div className="flex space-x-4">
        <button
          onClick={handleDelete}
          className="text-cyan-500 hover:text-red-700 focus:outline-none focus:text-cyan-200 disabled:text-cyan-300 py-1 px-2 rounded-lg text-md border-2 border-[#ff9800] shadow-lg "
        >
          Delete
        </button>
        <button className="text-cyan-500 hover:text-yellow-500 focus:outline-none focus:text-cyan-200 disabled:text-cyan-300 py-1 px-4 rounded-lg text-md border-2 border-[#ff9800] shadow-lg">
          <Link to={`/edit/${blog._id}`}>Edit</Link>
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
