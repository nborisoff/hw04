import { Router } from "express";
import { findComment } from "../controllers/findCommentController";

import {
  authMiddleware,
  commentsInputValidators,
  inputCheckErrorsMiddleware,
} from "../middleware/middlewares";
import { updateComment } from "../controllers/updateCommentController";
import { deleteComment } from "../controllers/deleteCommentController";

export const commentsRouter = Router();

commentsRouter.get("/:id", findComment);
commentsRouter.put(
  "/:id",
  authMiddleware,
  commentsInputValidators,
  inputCheckErrorsMiddleware,
  updateComment,
);
commentsRouter.delete("/:id", authMiddleware, deleteComment);
