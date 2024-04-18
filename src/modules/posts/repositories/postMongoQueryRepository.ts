import { PostDBType } from "../models/posts";
import { ObjectId, WithId } from "mongodb";
import { postCollection } from "../../../db/mongo-db";

export const postMongoQueryRepository = {
  async getMany(query: any, blogId?: string) {
    const byId = blogId ? { blogId: new ObjectId(blogId) } : {};
    const search = query.searchNameTerm
      ? { title: { $regex: query.searchNameTerm, $options: "i" } }
      : {};

    try {
      const items = await postCollection.find({ ...byId, ...search }).toArray();
      const documentsCount = await postCollection.countDocuments({
        ...byId,
        ...search,
      });

      return {
        pagesCount: Math.ceil(documentsCount / query.pageSize),
        page: query.pageNumber,
        pageSize: query.pageSize,
        totalCount: documentsCount,
        items: items.map(this.mapToOutput),
      };
    } catch (e) {
      console.log(e);
      return;
    }
  },
  async find(id: ObjectId) {
    return await postCollection.findOne({ _id: id });
  },
  async findForOutput(id: ObjectId) {
    const post = await this.find(id);
    if (!post) {
      return null;
    }
    return this.mapToOutput(post);
  },
  mapToOutput(post: WithId<PostDBType>) {
    const {
      _id,
      title,
      shortDescription,
      content,
      blogId,
      blogName,
      createdAt,
    } = post;
    return {
      id: _id,
      title,
      shortDescription,
      content,
      blogId,
      blogName,
      createdAt,
    };
  },
};
