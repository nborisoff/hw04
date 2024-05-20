import { Request, Response } from "express";
import { postMongoQueryRepository } from "../repositories/postMongoQueryRepository";
import {postsService} from "../service/posts.service";

export const createPost = async (req: Request, res: Response) => {
  const createdPost = await postsService.createPost(req.body);

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
