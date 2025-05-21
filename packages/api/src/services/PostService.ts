import PostModel from '../db/models/Post';
import { PostDto } from '@social-platform/shared/src/types/dtos/PostDto';

interface CreatePostInput {
  profileId: string;
  content: string;
}

class PostService {
  async getPostById(id: string): Promise<PostDto | null> {
    return PostModel.findById(id);
  }

  async getPostsByProfileId(profileId: string): Promise<PostDto[]> {
    return PostModel.findByProfileId(profileId);
  }

  async createPost(input: CreatePostInput): Promise<PostDto> {
    return PostModel.create(input);
  }

  async updatePost(id: string, content: string): Promise<PostDto | null> {
    return PostModel.update(id, content);
  }

  async deletePost(id: string): Promise<void> {
    return PostModel.delete(id);
  }
}

export default new PostService(); 