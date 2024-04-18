import { config } from "dotenv";

config();
export const SETTINGS = {
  PORT: process.env.PORT || 3003,
  PATH: {
    POSTS: "/posts",
    BLOGS: "/blogs",
    TESTING: "/testing",
  },
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017",
  DB_NAME: process.env.DB_NAME || "local",
  BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || "blog",
  POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || "post",
};

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
  INTERNAL_SERVER_ERROR: 500,
};
