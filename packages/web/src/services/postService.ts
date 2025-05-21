import { get, post, patch, remove } from './apiClient';
import type { PostDto } from '@social-platform/shared/src/types/dtos/PostDto';

export interface CreatePostInput {
  profileId: string;
  content: string;
}

export interface UpdatePostInput {
  id: string;
  content: string;
}

const postService = {
  /**
   * Get a post by ID
   */
  getPostById: async (id: string): Promise<PostDto> => {
    return await get<PostDto>(`/posts/${id}`);
  },

  /**
   * Get posts by profile ID
   */
  getPostsByProfileId: async (profileId: string): Promise<PostDto[]> => {
    return await get<PostDto[]>(`/posts/profile/${profileId}`);
  },

  /**
   * Create a new post
   */
  createPost: async (input: CreatePostInput): Promise<PostDto> => {
    return await post<PostDto>('/posts', input);
  },

  /**
   * Update a post
   */
  updatePost: async (input: UpdatePostInput): Promise<PostDto> => {
    return await patch<PostDto>(`/posts/${input.id}`, { content: input.content });
  },

  /**
   * Delete a post
   */
  deletePost: async (id: string): Promise<void> => {
    await remove(`/posts/${id}`);
  },
};

export default postService;
