import { Collection, Db, MongoClient } from "mongodb";
import { SETTINGS } from "../app/settings";
import { BlogDBType } from "../modules/blogs/models/blogs";
import { PostDBType } from "../modules/posts/models/posts";
import { UserDBType } from "../modules/user/models/users";
import { CommentsDBType } from "../modules/comments/models/comments";

// получение доступа к бд
const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL);
export const db: Db = client.db(SETTINGS.DB_NAME);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(
  SETTINGS.BLOG_COLLECTION_NAME,
);
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(
  SETTINGS.POST_COLLECTION_NAME,
);
export const userCollection: Collection<UserDBType> = db.collection<UserDBType>(
  SETTINGS.USER_COLLECTION_NAME,
);

export const commentsCollection: Collection<CommentsDBType> =
  db.collection<CommentsDBType>(SETTINGS.COMMENTS_COLLECTION_NAME);

// проверка подключения к бд
export const connectToDB = async () => {
  try {
    await client.connect();
    // console.log("connected to db");
    return true;
  } catch (e) {
    console.log(e);
    await client.close();
    return false;
  }
};
