import { commentsCollection } from "../../../db/mongo-db";
import { ObjectId } from "mongodb";
import { CommentsInputType } from "../models/comments";
import { postMongoQueryRepository } from "../../posts/repositories/postMongoQueryRepository";
import { userMongoQueryRepository } from "../../user/repositories/userMongoQueryRepository";

export const commentsRepository = {
  async create(input: CommentsInputType) {
    const postId = new ObjectId(input.postId);
    const userId = new ObjectId(input.userId);
    const post = await postMongoQueryRepository.find(postId);
    const user = await userMongoQueryRepository.find(userId);

    if (!post) {
      return { error: "Invalid postId" };
    }

    const newComment = {
      ...input,
      commentatorInfo: {
        userId,
        userLogin: user!.login,
      },
      createdAt: new Date().toISOString(),
    };

    try {
      const insertedInfo = await commentsCollection.insertOne(newComment);
      return { id: insertedInfo.insertedId };
    } catch (e) {
      console.log(e);
      return { error: "e" };
    }
  },
  async update(id: ObjectId, body: CommentsInputType) {
    const result = await commentsCollection.updateOne(
      { _id: id },
      { $set: body },
    );
    return Boolean(result.modifiedCount);
  },
  async delete(id: ObjectId) {
    const result = await commentsCollection.deleteOne({ _id: id });

    return Boolean(result.deletedCount);
  },
};
