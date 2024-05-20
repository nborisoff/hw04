import { Response } from "express";
import { postMongoQueryRepository } from "../repositories/postMongoQueryRepository";
import { postsService } from "../service/posts.service";

export const createPostComment = async (
  req: any,
  // req: RequestParamsBody<PostIdModel, any>,
  res: Response,
) => {
  const createdComment = await postsService.createPostComment({
    ...req.body,
    postId: req.params.postId,
    userId: req.userId,
  });

  if (createdComment.error) {
    res.status(400).json(createdComment.error);
    return;
  }

  if (!createdComment.id) {
    res.status(500).json({});
    return;
  }

  const newComment = await postMongoQueryRepository.findForOutput(
    createdComment.id,
  );

  res.status(201).json(newComment);
};
