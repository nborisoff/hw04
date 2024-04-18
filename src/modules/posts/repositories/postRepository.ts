import { ObjectId } from "mongodb";
import { PostInputType } from "../models/posts";
import { postCollection } from "../../../db/mongo-db";
import { blogMongoQueryRepository } from "../../blogs/repositories/blogMongoQueryRepository";

export const postRepository = {
  async create(input: PostInputType) {
    const blogId = new ObjectId(input.blogId);
    const blog = await blogMongoQueryRepository.find(blogId);
    if (!blog) {
      return { error: "Invalid blogId" };
    }

    const newPost = {
      ...input,
      blogId,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
      _id: new ObjectId(),
    };

    try {
      const insertedInfo = await postCollection.insertOne(newPost);
      return { id: new ObjectId(insertedInfo.insertedId) };
    } catch (e) {
      console.log(e);
      return { error: "e" };
    }
  },
  async update(id: ObjectId, body: PostInputType) {
    const result = await postCollection.updateOne({ _id: id }, { $set: body });
    return Boolean(result.modifiedCount);
  },
  async delete(id: ObjectId) {
    const result = await postCollection.deleteOne({ _id: id });

    return Boolean(result.deletedCount);
  },
};
