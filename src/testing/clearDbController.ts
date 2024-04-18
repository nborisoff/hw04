import { Request, Response } from "express";
import { blogCollection, postCollection } from "../db/mongo-db";
import { HTTP_STATUSES } from "../app/settings";

export const clearDb = async (req: Request, res: Response) => {
  await blogCollection.deleteMany({});
  await postCollection.deleteMany({});
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
