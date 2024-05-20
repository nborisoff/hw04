import { NextFunction, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { jwtService } from "../services/jwt.service";
import { AuthJWTType } from "../@types/auth.type";
import { userMongoQueryRepository } from "../../modules/user/repositories/userMongoQueryRepository";
import { ObjectId } from "mongodb";

export const jwtAuthMiddleware = async (
  // Типизировать
  req: any,
  res: Response,
  next: NextFunction,
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.includes("Bearer")
  ) {
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
    return;
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const { userId } = (await jwtService.getUserData(token)) as AuthJWTType;

    await userMongoQueryRepository.find(new ObjectId(userId));
    req.userId = userId;
    next();
  } catch (err) {
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
  }
};
