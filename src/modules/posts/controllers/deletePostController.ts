import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { postRepository } from "../repositories/postRepository";
import { HTTP_STATUSES } from "../../../app/settings";
import { postMongoQueryRepository } from "../repositories/postMongoQueryRepository";

export const deletePost = async (
  // req: RequestWithParams<PostIdModel>,
  req: Request,
  res: Response,
) => {
  let foundPost = await postMongoQueryRepository.find(
    new ObjectId(req.params.id),
  );

  if (!foundPost) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  let deletedPost = await postRepository.delete(foundPost._id);

  if (!deletedPost) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
