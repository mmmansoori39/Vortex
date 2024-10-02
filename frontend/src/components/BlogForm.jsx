import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";

const BlogForm = () => {
  const [blog, setBlog] = useState({
    title: "",
    types: "",
    description: "",
    img: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    blog: fetchedBlog,
    fetchBlog,
    createBlog,
    editBlog,
    isLoading,
    error,
  } = useBlogStore();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchBlogToEdit = async () => {
        await fetchBlog(id);
        setBlog({
          title: fetchedBlog.title || "",
          types: fetchedBlog.types || "",
          description: fetchedBlog.description || "",
          img: fetchedBlog.img || "",
        });
      };

      fetchBlogToEdit();
    }
  }, [id, fetchBlog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  console.log(blog)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await editBlog(id, blog);
      } else {
        await createBlog(blog);
      }
      navigate("/blog");
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  return (
    <div className="container max-w-2xl p-4 mt-16">
      <h1 className="text-3xl font-bold mb-4 text-[#f0f0f0] font-mono">
        {isEdit ? "Edit Blog" : "Create Blog"}
      </h1>
      {isLoading && isEdit && <div className="text-[#ff9800]">Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-[#0b1b29] rounded-md font-mono border border-[#ff9800] p-6 shadow"
      >
        <div className="mb-4">
          <label className="block text-[#f0f0f0] mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
            className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#f0f0f0] mb-1">Type</label>
          <input
            type="text"
            name="types"
            value={blog.types}
            onChange={handleChange}
            required
            className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#f0f0f0] mb-1">Description</label>
          <textarea
            name="description"
            value={blog.description}
            onChange={handleChange}
            required
            className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-[#f0f0f0] mb-1">Image URL</label>
          <input
            type="text"
            name="img"
            value={blog.img}
            onChange={handleChange}
            required
            className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-[#ff9800] text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
