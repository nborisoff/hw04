import { Request, Response } from "express";
import { userService } from "../service/userService";
import { userMongoQueryRepository } from "../repositories/userMongoQueryRepository";
import { HTTP_STATUSES } from "../../../app/settings";

export const createUser = async (req: Request, res: Response) => {
  const createdUser = await userService.createUser(req.body);

  if (!createdUser.id) {
    res.sendStatus(500);
    return;
  }

  const newUser = await userMongoQueryRepository.findForOutput(createdUser.id);

  res.status(HTTP_STATUSES.CREATED_201).json(newUser);
};
