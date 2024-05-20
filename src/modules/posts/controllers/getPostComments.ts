import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../../app/settings";
import { commentMongoQueryRepository } from "../../comments/repositories/commentsMongoQueryRepository";
import { helper } from "../utils/posts";

export const getPostComments = async (req: Request, res: Response) => {
  const sanitizedQuery = helper(req.query);
  const comments = await commentMongoQueryRepository.getMany(
    sanitizedQuery,
    req.params.postId,
  );

  res.status(HTTP_STATUSES.OK_200).json(comments);
};
