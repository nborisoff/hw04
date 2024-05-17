import { userCollection } from "../../../db/mongo-db";
import { ObjectId } from "mongodb";
import { UserDBType, UserInputType } from "../models/users";
import { bcryptService } from "../../../common/services/bcrypt.service";

export const userRepository = {
  async create(user: UserDBType) {
    try {
      const insertedInfo = await userCollection.insertOne(user);
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
