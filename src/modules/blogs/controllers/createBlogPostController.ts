import { Response } from "express";
import { blogService } from "../service/blogService";
import { postMongoQueryRepository } from "../../posts/repositories/postMongoQueryRepository";
import { RequestParamsBody } from "../../../types/common-types";
import { BlogIdModel } from "../models/blogs";

export const createBlogPost = async (
  req: RequestParamsBody<BlogIdModel, any>,
  res: Response,
) => {
  const createdPost = await blogService.createBlogPost({
    ...req.body,
    blogId: req.params.blogId,
  });

  if (createdPost.error) {
    res.status(400).json(createdPost.error);
    return;
  }

  if (!createdPost.id) {
    res.status(500).json({});
    return;
  }

  const newPost = await postMongoQueryRepository.findForOutput(createdPost.id);

  res.status(201).json(newPost);
};
