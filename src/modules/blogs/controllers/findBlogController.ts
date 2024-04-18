import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HTTP_STATUSES } from "../../../app/settings";
import { blogMongoQueryRepository } from "../repositories/blogMongoQueryRepository";

export const findBlog = async (req: Request, res: Response) => {
  let foundBlog = await blogMongoQueryRepository.findForOutput(
    new ObjectId(req.params.id),
  );

  if (!foundBlog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.status(HTTP_STATUSES.OK_200).json(foundBlog);
};
