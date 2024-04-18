import { BlogDBType, BlogInputType } from "../models/blogs";
import { blogCollection } from "../../../db/mongo-db";
import { ObjectId, WithId } from "mongodb";

export const blogRepository = {
  async create(input: BlogInputType) {
    const newBlog = {
      ...input,
      createdAt: new Date().toISOString(),
      isMembership: false,
      // _id: new ObjectId(),
    };

    try {
      const insertedInfo = await blogCollection.insertOne(newBlog);
      return { id: insertedInfo.insertedId };
    } catch (e) {
      console.log(e);
      return { error: "e" };
    }
  },
  async update(id: ObjectId, body: BlogInputType) {
    const result = await blogCollection.updateOne({ _id: id }, { $set: body });
    return Boolean(result.modifiedCount);
  },
  async delete(id: ObjectId) {
    const result = await blogCollection.deleteOne({ _id: id });

    return Boolean(result.deletedCount);
  },
  mapToOutput(blog: WithId<BlogDBType>) {
    const { _id, name, description, websiteUrl, isMembership, createdAt } =
      blog;
    return {
      id: _id,
      name,
      description,
      websiteUrl,
      isMembership,
      createdAt,
    };
  },
};
