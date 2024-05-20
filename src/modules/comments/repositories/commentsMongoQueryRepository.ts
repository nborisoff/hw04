import { commentsCollection } from "../../../db/mongo-db";
import { ObjectId, WithId } from "mongodb";
import { CommentsDBType } from "../models/comments";

export const commentMongoQueryRepository = {
  async getMany(query: any, postId?: string) {
    const byId = postId ? { blogId: new ObjectId(postId) } : {};
    const search = query.searchNameTerm
      ? { title: { $regex: query.searchNameTerm, $options: "i" } }
      : {};
    const { sortBy, sortDirection, pageNumber, pageSize } = query;

    try {
      const items = await commentsCollection
        .find({ ...byId, ...search })
        .sort(sortBy, sortDirection)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .toArray();
      const totalCount = await commentsCollection.countDocuments({
        ...byId,
        ...search,
      });

      return {
        pagesCount: Math.ceil(totalCount / pageSize),
        page: pageNumber,
        pageSize,
        totalCount,
        items: items.map(this.mapToOutput),
      };
    } catch (e) {
      console.log(e);
      return;
    }
  },
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
