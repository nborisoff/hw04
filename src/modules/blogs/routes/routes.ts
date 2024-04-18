import { Router } from "express";
import { getBlogs } from "../controllers/getBlogsController";
import {
  authMiddleware,
  blogInputValidators,
  inputCheckErrorsMiddleware,
} from "../middleware/middlewares";
import { createBlog } from "../controllers/createBlogController";
import { findBlog } from "../controllers/findBlogController";
import { updateBlog } from "../controllers/updateBlogController";
import { deleteBlog } from "../controllers/deleteBlogController";
import { getBlogPosts } from "../controllers/getBlogPostsController";
import { createBlogPost } from "../controllers/createBlogPostController";
import { blogPostInputValidators } from "../../posts/middleware/middlewares";

export const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.post(
  "/",
  authMiddleware,
  ...blogInputValidators,
  inputCheckErrorsMiddleware,
  createBlog,
);
blogRouter.get("/:blogId/posts", getBlogPosts);
blogRouter.post(
  "/:blogId/posts",
  authMiddleware,
  ...blogPostInputValidators,
  inputCheckErrorsMiddleware,
  createBlogPost,
);
blogRouter.get("/:id", findBlog);
blogRouter.put(
  "/:id",
  authMiddleware,
  ...blogInputValidators,
  inputCheckErrorsMiddleware,
  updateBlog,
);
blogRouter.delete("/:id", authMiddleware, deleteBlog);
