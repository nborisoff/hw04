import { ObjectId } from "mongodb";

export type PostDBType = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: ObjectId;
  blogName: string;
  createdAt?: string;
};

export type PostIdModel = {
  id: ObjectId;
};

export type PostInputType = Pick<
  PostDBType,
  "title" | "shortDescription" | "content" | "blogId"
>;
