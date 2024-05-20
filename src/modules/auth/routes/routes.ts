import { Router } from "express";
import { authLogin } from "../controllers/authLoginController";
import {
  authInputValidators,
  inputCheckErrorsMiddleware,
} from "../middleware/middlewares";
import { getCurrentUser } from "../controllers/getCurrentUserController";
import { jwtAuthMiddleware } from "../../../common/middlewares/auth.middleware";

export const authRouter = Router();

authRouter.post(
  "/login",
  ...authInputValidators,
  inputCheckErrorsMiddleware,
  authLogin,
);
authRouter.get(
  "/me",
  jwtAuthMiddleware,
  inputCheckErrorsMiddleware,
  getCurrentUser,
);
