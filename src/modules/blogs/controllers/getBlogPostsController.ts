import { Response } from "express";
import { helper } from "../utils/blogs";
import { RequestParamsQuery } from "../../../types/common-types";
import { TBlogQueryModel } from "../@types/blogs";
import { BlogIdModel } from "../models/blogs";
import { HTTP_STATUSES } from "../../../app/settings";
import { postMongoQueryRepository } from "../../posts/repositories/postMongoQueryRepository";
import { blogMongoQueryRepository } from "../repositories/blogMongoQueryRepository";
import { ObjectId } from "mongodb";

export const getBlogPosts = async (
  req: RequestParamsQuery<BlogIdModel, TBlogQueryModel>,
  res: Response,
) => {
  // const blog = await blogMongoQueryRepository.find(
  //   new ObjectId(req.params.blogId),
  // );
  //
  // if (!blog) {
  //   res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  // }

  const sanitizedQuery = helper(req.query);
  const posts = await postMongoQueryRepository.getMany(
    sanitizedQuery,
    req.params.blogId,
  );

  res.status(HTTP_STATUSES.OK_200).json(posts);
};
