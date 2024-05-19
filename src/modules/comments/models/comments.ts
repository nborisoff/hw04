import { ObjectId } from "mongodb";

export type CommentsDBType = {
  content: string;
  commentatorInfo: CommentatorInfoType;
  createdAt: string;
};

type CommentatorInfoType = {
  userId: ObjectId;
  userLogin: string;
};

export type CommentsInputType = Pick<CommentsDBType, "content">;
