import { Response } from "express";
import { HTTP_STATUSES } from "../../../app/settings";
import { postMongoQueryRepository } from "../repositories/postMongoQueryRepository";
import {
  PaginationAndSortQuery,
  RequestQuery,
} from "../../../types/common-types";
import { helper } from "../utils/posts";

export const getPosts = async (
  req: RequestQuery<PaginationAndSortQuery>,
  res: Response,
) => {
  const sanitizedQuery = helper(req.query);
  const posts = await postMongoQueryRepository.getMany(sanitizedQuery);

  res.status(HTTP_STATUSES.OK_200).json(posts);
};
