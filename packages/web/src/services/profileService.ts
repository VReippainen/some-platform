import { get } from './apiClient';
import { ProfileResponse, ProfilesResponse, type ProfileDto } from '@social-platform/shared';
const profileService = {
  /**
   * Get current profile data
   */
  getCurrentProfile: async (): Promise<ProfileDto> => {
    const response = await get<ProfilesResponse>('/profiles/me');
    return response.data[0];
  },

  /**
   * Get profile by ID
   */
  getProfileById: async (id: string): Promise<ProfileDto> => {
    const response = await get<ProfileResponse>(`/profiles/${id}`);
    return response.data;
  },

  /**
   * Search profiles by username (partial match)
   */
  searchProfiles: async (query: string) => {
    const response = await get<ProfilesResponse>('/profiles/search', { q: query });
    return response.data;
  },
};

export default profileService;
