import { postRepository } from "../repositories/postRepository";
import {commentsRepository} from "../../comments/repositories/commentsRepository";

export const postsService = {
    async createPost(body: any) {
        return await postRepository.create(body);
    },
    async createPostComment(body: any) {
        return await commentsRepository.create(body);
    },
};
