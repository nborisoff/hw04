import { Request, Response } from "express";
import { blogService } from "../service/blogService";
import { blogMongoQueryRepository } from "../repositories/blogMongoQueryRepository";

export const createBlog = async (req: Request, res: Response) => {
  const createdBlog = await blogService.createBlog(req.body);

  if (!createdBlog.id) {
    res.status(500).json({});
    return;
  }

  const newBlog = await blogMongoQueryRepository.findForOutput(createdBlog.id);

  res.status(201).json(newBlog);
};
