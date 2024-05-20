import {
  body,
  FieldValidationError,
  validationResult,
} from "express-validator";
import { NextFunction, Request, Response } from "express";

const userLoginInputValidator = body("loginOrEmail")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .trim()
  .notEmpty()
  .withMessage("field is empty");

const userPasswordInputValidator = body("password")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .trim()
  .notEmpty()
  .withMessage("field is empty");

export const authInputValidators = [
  userLoginInputValidator,
  userPasswordInputValidator,
];

export const inputCheckErrorsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const e = validationResult(req);
  const errors = e.array({ onlyFirstError: true });

  if (errors.length) {
    res.status(400).json({
      errorsMessages: errors.map((error) => {
        const { msg, path } = error as FieldValidationError;
        return { message: `${path} error`, field: path };
      }),
    });
    return;
  }
  next();
};

export const jwtAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
  //   res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
  // }
  //
  // const token = req.headers.authorization!.split(' ')?.[1]
  // const userId = await jwtService.getUserId(token);
  //
  // if (userId) {
  //   req.userId = userId
  //   next();
  // }
  //
  // res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
};
