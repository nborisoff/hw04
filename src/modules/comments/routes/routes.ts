import { Router } from "express";
import { findComment } from "../controllers/findCommentController";

import {
  commentsInputValidators,
  inputCheckErrorsMiddleware,
} from "../middleware/middlewares";
import { updateComment } from "../controllers/updateCommentController";
import { deleteComment } from "../controllers/deleteCommentController";
import { jwtAuthMiddleware } from "../../../common/middlewares/auth.middleware";

export const commentsRouter = Router();

commentsRouter.get("/:id", findComment);
commentsRouter.put(
  "/:id",
  jwtAuthMiddleware,
  commentsInputValidators,
  inputCheckErrorsMiddleware,
  updateComment,
);
commentsRouter.delete(
  "/:id",
  jwtAuthMiddleware,
  inputCheckErrorsMiddleware,
  deleteComment,
);
