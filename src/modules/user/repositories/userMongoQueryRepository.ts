import { ObjectId, WithId } from "mongodb";
import { blogCollection, userCollection } from "../../../db/mongo-db";
import { UserDBType } from "../models/users";
import { BlogDBType } from "../../blogs/models/blogs";

export const userMongoQueryRepository = {
  async getMany(query: any) {
    const { sortBy, sortDirection, pageNumber, pageSize } = query;
    const search: { login?: any; email?: any } = {};

    if (query.searchLoginTerm)
      search.login = { $regex: query.searchLoginTerm, $options: "i" };
    if (query.searchEmailTerm)
      search.email = { $regex: query.searchEmailTerm, $options: "i" };

    try {
      const items = await userCollection
        .find({ ...search })
        .sort(sortBy, sortDirection)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .toArray();
      const documentsCount = await userCollection.countDocuments({ ...search });

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
  async find(id: ObjectId): Promise<WithId<UserDBType> | null> {
    return await userCollection.findOne({ _id: id });
  },
  async findForOutput(id: ObjectId) {
    const user = await this.find(id);
    if (!user) {
      return null;
    }
    return this.mapToOutput(user);
  },
  async findByLogin(login: string) {
    return await userCollection.findOne({ login });
  },
  mapToOutput(user: WithId<UserDBType>) {
    const { _id, login, email, createdAt } = user;
    return {
      id: _id,
      login,
      email,
      createdAt,
    };
  },
};
