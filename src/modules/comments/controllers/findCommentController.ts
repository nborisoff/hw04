import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { commentMongoQueryRepository } from "../repositories/commentsMongoQueryRepository";
import { HTTP_STATUSES } from "../../../app/settings";

export const findComment = async (req: Request, res: Response) => {
  const foundComment = await commentMongoQueryRepository.findForOutput(
    new ObjectId(req.params.id),
  );

  if (!foundComment) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }

  res.status(HTTP_STATUSES.OK_200).json(foundComment);
};
