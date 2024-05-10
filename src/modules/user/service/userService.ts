import { userRepository } from "../repositories/userRepository";

export const userService = {
  async createUser(body: any) {
    return await userRepository.create(body);
  },
};
