import { blogRepository } from "../repositories/blogRepository";
import { postRepository } from "../../posts/repositories/postRepository";

export const blogService = {
  async createBlog(body: any) {
    return await blogRepository.create(body);
  },
  async createBlogPost(body: any) {
    return await postRepository.create(body);
  },
};
