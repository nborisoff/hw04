import { blogCollection } from "../../../db/mongo-db";
import { BlogDBType } from "../models/blogs";
import { ObjectId, WithId } from "mongodb";

export const blogMongoQueryRepository = {
  // TGetBlogs
  async getMany(query: any) {
    const search = query.searchNameTerm
      ? { name: { $regex: query.searchNameTerm, $options: "i" } }
      : {};
    const { sortBy, sortDirection, pageNumber, pageSize } = query;

    try {
      const items = await blogCollection
        .find({ ...search })
        .sort(sortBy, sortDirection)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .toArray();
      const documentsCount = await blogCollection.countDocuments({ ...search });

      return {
        pagesCount: Math.ceil(documentsCount / pageSize),
        page: pageNumber,
        pageSize,
        totalCount: documentsCount,
        items: items.map(this.mapToOutput),
      };
    } catch (e) {
      console.log(e);
      return;
    }
  },
  async find(id: ObjectId): Promise<WithId<BlogDBType> | null> {
    return await blogCollection.findOne({ _id: id });
  },
  async findForOutput(id: ObjectId) {
    const blog = await this.find(id);
    if (!blog) {
      return null;
    }
    return this.mapToOutput(blog);
  },
  mapToOutput(blog: WithId<BlogDBType>) {
    const { _id, name, description, websiteUrl, createdAt, isMembership } =
      blog;
    return {
      id: _id,
      name,
      description,
      websiteUrl,
      createdAt,
      isMembership,
    };
  },
};
