import express from "express";
import {
  createBlog,
  deleteBlogById,
  getBlogById,
  getBlogs,
  updateBlog
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/add", createBlog);
router.get("/all", getBlogs);
router.get("/:id", getBlogById);
router.put("/edit/:id", updateBlog);
router.delete("/delete/:id", deleteBlogById);

export default router;