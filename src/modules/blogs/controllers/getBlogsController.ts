import { Response } from "express";
import { HTTP_STATUSES } from "../../../app/settings";
import { helper } from "../utils/blogs";
import { TBlogQueryModel } from "../@types/blogs";
import { RequestQuery } from "../../../types/common-types";
import { blogMongoQueryRepository } from "../repositories/blogMongoQueryRepository";

export const getBlogs = async (
  req: RequestQuery<TBlogQueryModel>,
  res: Response,
) => {
  const sanitizedQuery = helper(req.query);
  const blogs = await blogMongoQueryRepository.getMany(sanitizedQuery);

  res.status(HTTP_STATUSES.OK_200).json(blogs);
};
