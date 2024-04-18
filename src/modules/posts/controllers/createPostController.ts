import { Request, Response } from "express";
import { postRepository } from "../repositories/postRepository";
import { postMongoQueryRepository } from "../repositories/postMongoQueryRepository";

export const createPost = async (req: Request, res: Response) => {
  const createdPost = await postRepository.create(req.body);

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
