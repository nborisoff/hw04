import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { blogRepository } from "../repositories/blogRepository";
import { HTTP_STATUSES } from "../../../app/settings";
import { blogMongoQueryRepository } from "../repositories/blogMongoQueryRepository";

export const updateBlog = async (
  // req: RequestWithParamsAndBody<BlogIdModel, BlogInputType>,
  req: Request,
  res: Response,
) => {
  const foundBlog = await blogMongoQueryRepository.find(
    new ObjectId(req.params.id),
  );

  if (!foundBlog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  const updatedBlog = await blogRepository.update(foundBlog._id, req.body);

  if (!updatedBlog) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
