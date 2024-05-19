import { Router } from "express";
import { findComment } from "../controllers/findCommentController";
import { updateBlog } from "../../blogs/controllers/updateBlogController";
import { deleteBlog } from "../../blogs/controllers/deleteBlogController";
import {
  authMiddleware,
  commentsInputValidators,
  inputCheckErrorsMiddleware,
} from "../middleware/middlewares";

export const blogRouter = Router();

blogRouter.get("/:id", findComment);
blogRouter.put(
  "/:id",
  authMiddleware,
  commentsInputValidators,
  inputCheckErrorsMiddleware,
  updateBlog,
);
blogRouter.delete("/:id", authMiddleware, deleteBlog);
