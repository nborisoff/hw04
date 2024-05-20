import { Response } from "express";
import { HTTP_STATUSES } from "../../../app/settings";
import { jwtService } from "../../../common/services/jwt.service";

export const getCurrentUser = async (
  // Типизировать
  req: any,
  res: Response,
) => {
  const token = req.headers.authorization!.split(" ")[1];
  const tokenData: any = await jwtService.getUserData(token);
  const { userId, login, email } = tokenData;

  res.status(HTTP_STATUSES.OK_200).send({ userId, login, email });
};
