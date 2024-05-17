import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../../app/settings";
import { jwtService } from "../../../common/services/jwt.service";

export const getCurrentUser = async (req: Request, res: Response) => {
  // if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
  //   res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
  // }

  const token = req.headers.authorization!.split(" ")?.[1];
  const tokenData: any = await jwtService.getUserData(token);

  if (tokenData.userId) {
    const { userId, login, email } = tokenData;
    res.status(HTTP_STATUSES.OK_200).send({ userId, login, email });
  }

  res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
};
