import { Response } from "express";
import { RequestWithParams } from "../../../types/common-types";
import { PostIdModel } from "../models/posts";
import { ObjectId } from "mongodb";
import { HTTP_STATUSES } from "../../../app/settings";
import { postMongoQueryRepository } from "../repositories/postMongoQueryRepository";

export const findPost = async (
  req: RequestWithParams<PostIdModel>,
  res: Response,
) => {
  let foundPost = await postMongoQueryRepository.findForOutput(
    new ObjectId(req.params.id),
  );

  if (!foundPost) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.status(HTTP_STATUSES.OK_200).json(foundPost);
};
