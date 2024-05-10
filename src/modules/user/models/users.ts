import { BlogDBType } from "../../blogs/models/blogs";

export type UserDBType = {
  login: string;
  email: string;
  createdAt?: string;
};

export type UserIdModel = {
  id: string;
};

export type UserInputType = Pick<UserDBType, "login" | "email"> & {
  password: string;
};
