import { Router, Response, Request, NextFunction } from "express";
import {
  body,
  param,
  FieldValidationError,
  validationResult,
} from "express-validator";
import { ObjectId } from "mongodb";
import { blogMongoQueryRepository } from "../../blogs/repositories/blogMongoQueryRepository";

const postTitleInputValidator = body("title")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .trim()
  .notEmpty()
  .withMessage("field is empty")
  .isLength({ max: 30 })
  .withMessage("length limit exceeded");
const postShortDescriptionInputValidator = body("shortDescription")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .trim()
  .notEmpty()
  .withMessage("field is empty")
  .isLength({ max: 100 })
  .withMessage("length limit exceeded");
const postContentInputValidator = body("content")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .trim()
  .notEmpty()
  .withMessage("field is empty")
  .isLength({ max: 1000 })
  .withMessage("length limit exceeded");
const postBlogIdInputValidator = body("blogId")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .trim()
  .notEmpty()
  .withMessage("field is empty");

export const blogIdCheckCallback = async (blogId: string) => {
  const blog = await blogMongoQueryRepository.find(new ObjectId(blogId));

  if (!blog) {
    return Promise.reject("blog not found");
  }
};

export const existingBlogIdBodyValidator = body("blogId")
  .custom(blogIdCheckCallback)
  .withMessage("blog not found");

export const existingBlogIdParamValidator = param("blogId")
  .custom(blogIdCheckCallback)
  .withMessage("blog not found");

export const postInputValidators = [
  postTitleInputValidator,
  postShortDescriptionInputValidator,
  postContentInputValidator,
  postBlogIdInputValidator,
  existingBlogIdBodyValidator,
];

export const blogPostInputValidators = [
  postTitleInputValidator,
  postShortDescriptionInputValidator,
  postContentInputValidator,
  existingBlogIdParamValidator,
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

export const ADMIN_AUTH = "admin:qwerty";
// export const ADMIN_AUTH = "trickster:Passw1rd"; // get from SETTINGS
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers["authorization"] as string; // 'Basic xxxx'

  if (!auth) {
    res.status(401).json({});
    return;
  }
  const buff = Buffer.from(auth.slice(6), "base64");
  const decodedAuth = buff.toString("utf8");

  const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
  const codedAuth = buff2.toString("base64");

  // if (decodedAuth !== ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
  if (auth.slice(6) !== codedAuth || auth.slice(0, 5) !== "Basic") {
    res.status(401).json({});
    return;
  }

  next();
};
