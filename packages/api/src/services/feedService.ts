import PostModel from '../db/models/Post';
import { PostDto } from '@social-platform/shared/src/types/dtos/PostDto';

class FeedService {
  async getPostsByProfileId(): Promise<PostDto[]> {
    // For now, return all posts regardless of profileId
    // When PostModel has a method to fetch all posts, use it
    // Otherwise, fetch by profileId if needed in the future
    return PostModel.getAllPosts();
  }
}

export default new FeedService(); 