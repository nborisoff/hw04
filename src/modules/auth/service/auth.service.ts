import { userRepository } from "../../user/repositories/userRepository";
import { bcryptService } from "../../../common/services/bcrypt.service";
import { UserDBType, UserInputType } from "../../user/models/users";
import { userMongoQueryRepository } from "../../user/repositories/userMongoQueryRepository";
import { jwtService } from "../../../common/services/jwt.service";

export const authService = {
  async registerUser({ login, password, email }: UserInputType) {
    const newUser: UserDBType = {
      login,
      email,
      password: await bcryptService.generateHash(password),
      createdAt: new Date().toISOString(),
    };
    return await userRepository.create(newUser);
  },
  async checkUser(loginOrEmail: string, password: string) {
    const user =
      await userMongoQueryRepository.findByLoginOrEmail(loginOrEmail);

    if (!user) {
      return false;
    }

    const isPasswordValid = await bcryptService.checkPassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return false;
    }

    return await jwtService.createJWT(user);
  },
};
