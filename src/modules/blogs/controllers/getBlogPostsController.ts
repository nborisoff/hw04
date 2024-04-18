import { Response } from "express";
import { helper } from "../utils/blogs";
import { RequestParamsQuery } from "../../../types/common-types";
import { TBlogQueryModel } from "../@types/blogs";
import { BlogIdModel } from "../models/blogs";
import { HTTP_STATUSES } from "../../../app/settings";
import { postMongoQueryRepository } from "../../posts/repositories/postMongoQueryRepository";

export const getBlogPosts = async (
  req: RequestParamsQuery<BlogIdModel, TBlogQueryModel>,
  res: Response,
) => {
  const sanitizedQuery = helper(req.query);
  const posts = await postMongoQueryRepository.getMany(
    sanitizedQuery,
    req.params.blogId,
  );

  res.status(HTTP_STATUSES.OK_200).json(posts);
};
