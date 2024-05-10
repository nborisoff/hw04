import { Router } from "express";
import { getUsers } from "../controllers/getUserController";
import {
  authMiddleware,
  inputCheckErrorsMiddleware,
  userInputValidators,
} from "../middleware/middlewares";
import { createUser } from "../controllers/createUserController";
import { deleteUser } from "../controllers/deleteUserController";

export const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post(
  "/",
  authMiddleware,
  ...userInputValidators,
  inputCheckErrorsMiddleware,
  createUser,
);
userRouter.delete("/:id", authMiddleware, deleteUser);
