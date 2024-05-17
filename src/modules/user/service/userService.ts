import { authService } from "../../auth/service/auth.service";
import { UserInputType } from "../models/users";

export const userService = {
  async createUser(body: UserInputType) {
    return await authService.registerUser(body);
  },
};
