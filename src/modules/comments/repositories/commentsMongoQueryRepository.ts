import { commentsCollection } from "../../../db/mongo-db";
import { ObjectId, WithId } from "mongodb";
import { CommentsDBType } from "../models/comments";

export const commentMongoQueryRepository = {
  async find(id: ObjectId): Promise<WithId<CommentsDBType> | null> {
    return await commentsCollection.findOne({ _id: id });
  },
  async findForOutput(id: ObjectId) {
    const comment = await this.find(id);
    if (!comment) {
      return null;
    }
    return this.mapToOutput(comment);
  },
  mapToOutput(comment: WithId<CommentsDBType>) {
    const { _id, content, commentatorInfo, createdAt } = comment;
    return {
      id: _id,
      content,
      commentatorInfo,
      createdAt,
    };
  },
};
