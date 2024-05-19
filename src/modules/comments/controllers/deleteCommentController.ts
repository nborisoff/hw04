import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HTTP_STATUSES } from "../../../app/settings";
import { commentMongoQueryRepository } from "../repositories/commentsMongoQueryRepository";
import { commentsRepository } from "../repositories/commentsRepository";

export const deleteComment = async (req: Request, res: Response) => {
  let foundComment = await commentMongoQueryRepository.find(
    new ObjectId(req.params.id),
  );

  if (!foundComment) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  let deletedComment = await commentsRepository.delete(foundComment._id);

  if (!deletedComment) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
