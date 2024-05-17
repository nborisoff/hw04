import { Response } from "express";
import { RequestWithBody } from "../../../types/common-types";
import { TAuthBodyModel } from "../models/auth";
import { HTTP_STATUSES } from "../../../app/settings";
import { authService } from "../service/auth.service";

export const authLogin = async (
  req: RequestWithBody<TAuthBodyModel>,
  res: Response,
) => {
  const token = await authService.checkUser(
    req.body.loginOrEmail,
    req.body.password,
  );

  if (!token) {
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
  } else {
    res.status(HTTP_STATUSES.OK_200).send({ accessToken: token });
  }
};
