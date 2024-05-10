import { Response } from "express";
import { helper } from "../utils/users";
import { RequestQuery } from "../../../types/common-types";
import { TUserQueryModel } from "../@types/users";
import { userMongoQueryRepository } from "../repositories/userMongoQueryRepository";
import { HTTP_STATUSES } from "../../../app/settings";

export const getUsers = async (
  req: RequestQuery<TUserQueryModel>,
  res: Response,
) => {
  const sanitizedQuery = helper(req.query);
  const users = await userMongoQueryRepository.getMany(sanitizedQuery);

  res.status(HTTP_STATUSES.OK_200).json(users);
};
