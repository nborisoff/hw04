import { Router } from "express";
import { getPosts } from "../controllers/getPostsController";
import {
  authMiddleware,
  existingBlogIdBodyValidator,
  inputCheckErrorsMiddleware,
  postBlogIdInputValidator,
  postInputValidators,
} from "../middleware/middlewares";
import { createPost } from "../controllers/createPostController";
import { findPost } from "../controllers/findPostController";
import { updatePost } from "../controllers/updatePostController";
import { deletePost } from "../controllers/deletePostController";

export const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.post(
  "/",
  authMiddleware,
  ...postInputValidators,
  postBlogIdInputValidator,
  existingBlogIdBodyValidator,
  inputCheckErrorsMiddleware,
  createPost,
);
postRouter.get("/:id", findPost);
postRouter.put(
  "/:id",
  authMiddleware,
  ...postInputValidators,
  postBlogIdInputValidator,
  existingBlogIdBodyValidator,
  inputCheckErrorsMiddleware,
  updatePost,
);
postRouter.delete("/:id", authMiddleware, deletePost);
