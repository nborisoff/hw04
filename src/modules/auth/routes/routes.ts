import { Router } from "express";
import { authLogin } from "../controllers/authLoginController";
import {
  authInputValidators,
  inputCheckErrorsMiddleware,
} from "../middleware/middlewares";

export const authRouter = Router();

authRouter.post(
  "/login",
  ...authInputValidators,
  inputCheckErrorsMiddleware,
  authLogin,
);
