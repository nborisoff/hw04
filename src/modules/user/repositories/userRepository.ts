import { userCollection } from "../../../db/mongo-db";
import { ObjectId } from "mongodb";
import { UserInputType } from "../models/users";

export const userRepository = {
  async create(input: UserInputType) {
    const newUser = {
      ...input,
      createdAt: new Date().toISOString(),
    };

    try {
      const insertedInfo = await userCollection.insertOne(newUser);
      return { id: insertedInfo.insertedId };
    } catch (e) {
      console.log(e);
      return { error: "e" };
    }
  },
  async delete(id: ObjectId) {
    const result = await userCollection.deleteOne({ _id: id });

    return Boolean(result.deletedCount);
  },
};