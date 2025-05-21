import { get } from './apiClient';
import type { PostDto } from '@social-platform/shared/src/types/dtos/PostDto';

const feedService = {
  /**
   * Get feed for a profile
   */
  getFeed: async (profileId: string): Promise<PostDto[]> => {
    return await get<PostDto[]>('/feed', { profileId });
  },
};

export default feedService;
