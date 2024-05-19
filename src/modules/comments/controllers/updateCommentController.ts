import { Request, Response } from "express";
import { commentMongoQueryRepository } from "../repositories/commentsMongoQueryRepository";
import { ObjectId } from "mongodb";
import { HTTP_STATUSES } from "../../../app/settings";
import { commentsRepository } from "../repositories/commentsRepository";

export const updateComment = async (req: Request, res: Response) => {
  const foundComment = await commentMongoQueryRepository.find(
    new ObjectId(req.params.id),
  );

  if (!foundComment) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  const updatedComment = commentsRepository.update(foundComment._id, req.body);

  if (!updatedComment) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
