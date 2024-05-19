import {NextFunction, Request, Response} from "express";
import {body, FieldValidationError, validationResult} from "express-validator";

const blogNameInputValidator = body("content")
    .exists()
    .withMessage("field not exist")
    .isString()
    .withMessage("not string")
    .trim()
    .notEmpty()
    .withMessage("field is empty")
    .isLength({ min: 20, max: 300 })
    .withMessage("length limit exceeded");

export const commentsInputValidators = [
    blogNameInputValidator
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

    if (auth.slice(6) !== codedAuth || auth.slice(0, 5) !== "Basic") {
        res.status(401).json({});
        return;
    }

    next();
};
