import { config } from "dotenv";

config();
export const SETTINGS = {
  PORT: process.env.PORT || 3003,
  PATH: {
    POSTS: "/posts",
    BLOGS: "/blogs",
    USERS: "/users",
    AUTH: "/auth",
    COMMENTS: "/comments",
    TESTING: "/testing",
  },
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017",
  DB_NAME: process.env.DB_NAME || "local",
  BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || "blog",
  POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || "post",
  USER_COLLECTION_NAME: process.env.USER_COLLECTION_NAME || "user",
  COMMENTS_COLLECTION_NAME: process.env.COMMENTS_COLLECTION_NAME || "comments",
  SECRET_KEY: process.env.SECRET_KEY || "JWT_SECRET"
};

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  UNAUTHORIZED_401: 401,
  NOT_FOUND_404: 404,
  INTERNAL_SERVER_ERROR: 500,
};
