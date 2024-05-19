import { commentsCollection } from "../../../db/mongo-db";
import { ObjectId } from "mongodb";
import { CommentsInputType } from "../models/comments";

export const commentsRepository = {
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
