import express, { Request, Response } from "express";
import cors from "cors";
import { SETTINGS } from "./app/settings";
import { connectToDB } from "./db/mongo-db";
import { blogRouter } from "./modules/blogs/routes/routes";
import { postRouter } from "./modules/posts/routes/routes";
import { testingRouter } from "./testing/routes";
import { userRouter } from "./modules/user/routes/routes";
import { authRouter } from "./modules/auth/routes/routes";
import { commentsRouter } from "./modules/comments/routes/routes";

const app = express();

const parseBodyMiddleware = express.json();
app.use(parseBodyMiddleware);
app.use(cors());

const start = async () => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello Samurai!");
  });

  if (!(await connectToDB())) {
    console.log("stop");
    process.exit(1);
    return;
  }

  app.use(SETTINGS.PATH.BLOGS, blogRouter);
  app.use(SETTINGS.PATH.POSTS, postRouter);
  app.use(SETTINGS.PATH.USERS, userRouter);
  app.use(SETTINGS.PATH.AUTH, authRouter);
  app.use(SETTINGS.PATH.COMMENTS, commentsRouter);
  app.use(SETTINGS.PATH.TESTING, testingRouter);

  app.listen(SETTINGS.PORT, () => {
    console.log(`App listening on port ${SETTINGS.PORT}`);
  });
};
start();

export default app;
