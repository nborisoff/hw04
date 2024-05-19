import { Request, Response } from "express";
import { blogService } from "../service/blogService";
import { blogMongoQueryRepository } from "../repositories/blogMongoQueryRepository";
import { HTTP_STATUSES } from "../../../app/settings";

export const createBlog = async (req: Request, res: Response) => {
  console.log(1)
  const createdBlog = await blogService.createBlog(req.body);

  if (!createdBlog.id) {
    res.status(500).json({});
    return;
  }

  const newBlog = await blogMongoQueryRepository.findForOutput(createdBlog.id);

  res.status(HTTP_STATUSES.CREATED_201).json(newBlog);
};
