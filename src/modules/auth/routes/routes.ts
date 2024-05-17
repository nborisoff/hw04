import { Router } from "express";
import { authLogin } from "../controllers/authLoginController";
import {
  authInputValidators,
  inputCheckErrorsMiddleware,
} from "../middleware/middlewares";
import { getCurrentUser } from "../controllers/getCurrentUserController";

export const authRouter = Router();

authRouter.post(
  "/login",
  ...authInputValidators,
  inputCheckErrorsMiddleware,
  authLogin,
);
authRouter.get("/me", getCurrentUser);
