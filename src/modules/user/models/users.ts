export type UserDBType = {
  login: string;
  email: string;
  password: string;
  createdAt?: string;
};

export type UserInputType = Pick<UserDBType, "login" | "email" | "password">;
