export type UserDBType = {
  login: string;
  email: string;
  password: string;
  passHash: string;
  createdAt?: string;
};

export type UserIdModel = {
  id: string;
};

export type UserInputType = Pick<UserDBType, "login" | "email" | "password">;
