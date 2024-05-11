import { Response } from "express";
import { RequestWithBody } from "../../../types/common-types";
import { userMongoQueryRepository } from "../../user/repositories/userMongoQueryRepository";
import { ObjectId } from "mongodb";
import { TAuthBodyModel } from "../models/auth";
import {HTTP_STATUSES} from "../../../app/settings";
import {bcryptService} from "../../user/service/bcrypt.service";

export const authLogin = async (
  req: RequestWithBody<TAuthBodyModel>,
  res: Response,
) => {
  let foundUser = await userMongoQueryRepository.find(
    new ObjectId(req.body.loginOrEmail),
  );

  if (!foundUser) {
    res.sendStatus(401);
    return;
  }

  const isCorrect = await bcryptService.checkPassword(foundUser.password, foundUser.passHash);

  if (isCorrect) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  } else {
    res.sendStatus(401);
  }
};
