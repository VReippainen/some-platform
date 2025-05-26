import PostModel from '../db/models/Post';
import { PostDto } from '@social-platform/shared/src/types/dtos/PostDto';

interface CreatePostInput {
  profileId: string;
  content: string;
}

class PostService {
  async getPostById(id: string): Promise<PostDto | null> {
    const post = await PostModel.findById(id);
    return post
  }

  async getPostsByProfileId(profileId: string): Promise<PostDto[]> {
    const posts = await PostModel.findByProfileId(profileId);
    return posts
  }

  async createPost(input: CreatePostInput): Promise<PostDto> {
    const post = await PostModel.create(input);
    return post
  }

  async updatePost(id: string, content: string): Promise<PostDto | null> {
    const post = await PostModel.update(id, content);
    return post
  }

  async deletePost(id: string): Promise<void> {
    await PostModel.delete(id);
  }
}

export default new PostService(); 