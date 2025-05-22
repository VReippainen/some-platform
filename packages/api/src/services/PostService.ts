import PostModel from '../db/models/Post';
import { PostDto } from '@social-platform/shared/src/types/dtos/PostDto';
import ImageService from './ImageService';
import { ImageDto } from '@social-platform/shared';

interface CreatePostInput {
  profileId: string;
  content: string;
}

class PostService {
  private async addSignedUrlToImages(images: ImageDto[]): Promise<ImageDto[]> {
    return Promise.all(images.map(ImageService.addSignedUrlToImage));
  }

  private async addSignedUrlToPost(post: PostDto): Promise<PostDto> {
    console.log('post', post);
    if (post.images) {
      console.log("this",this)
      const imagesWithSignedUrl = await this.addSignedUrlToImages(post.images ?? []);
      post.images = imagesWithSignedUrl;
    }
    return post;
  }

  async getPostById(id: string): Promise<PostDto | null> {
    const post = await PostModel.findById(id);
    if (!post) {
      return null;
    }
    return this.addSignedUrlToPost(post);
  }

  async getPostsByProfileId(profileId: string): Promise<PostDto[]> {
    const posts = await PostModel.findByProfileId(profileId);
    //console.log('posts', posts);
    return Promise.all(posts.map(post => this.addSignedUrlToPost(post)) ?? []);
  }

  async createPost(input: CreatePostInput): Promise<PostDto> {
    const post = await PostModel.create(input);
    return this.addSignedUrlToPost(post);
  }

  async updatePost(id: string, content: string): Promise<PostDto | null> {
    const post = await PostModel.update(id, content);
    if (!post) {
      return null;
    }
    return this.addSignedUrlToPost(post);
  }

  async deletePost(id: string): Promise<void> {
    await PostModel.delete(id);
  }
}

export default new PostService(); 