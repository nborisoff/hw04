import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HTTP_STATUSES } from "../../../app/settings";
import { userMongoQueryRepository } from "../repositories/userMongoQueryRepository";
import { userRepository } from "../repositories/userRepository";

export const deleteUser = async (req: Request, res: Response) => {
  let foundUser = await userMongoQueryRepository.find(
    new ObjectId(req.params.id),
  );

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  let deletedUser = await userRepository.delete(foundUser._id);

  if (!deletedUser) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
