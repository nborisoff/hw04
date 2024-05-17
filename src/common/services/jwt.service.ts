import jwt from "jsonwebtoken";
import { WithId } from "mongodb";
import { UserDBType } from "../../modules/user/models/users";
import { SETTINGS } from "../../app/settings";

export const jwtService = {
  async createJWT(user: WithId<UserDBType>) {
    const { _id, login, email } = user;
    return jwt.sign({ userId: _id, login, email }, SETTINGS.SECRET_KEY, {
      expiresIn: "1h",
    });
  },
  async getUserData(token: string) {
    //типизировать
    return jwt.verify(token, SETTINGS.SECRET_KEY);
  },
};
