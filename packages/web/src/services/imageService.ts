import { get } from './apiClient';
import type { ImageDto } from '@social-platform/shared/src/types/dtos/ImageDto';
import apiClient from './apiClient';

const imageService = {
  /**
   * Utility to delay execution for a given number of milliseconds
   */
  delay: (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Get multiple images by their IDs
   */
  getImagesByIds: async (ids: string[]): Promise<ImageDto[]> => {
    if (!ids.length) return [];
    const param = ids.join(',');
    return await get<ImageDto[]>(`/images/ids?ids=${param}`);
  },

  /**
   * Get a single image by its ID
   */
  getImageById: async (id: string): Promise<ImageDto> => {
    return await get<ImageDto>(`/images/${id}`);
  },

  /**
   * Get all images for a post
   */
  getImagesByPostId: async (postId: string): Promise<ImageDto[]> => {
    // add delay of two seconds
    await imageService.delay(2000);
    return await get<ImageDto[]>(`/images/post/${postId}`);
  },

  /**
   * Get all images for a profile
   */
  getImagesByProfileId: async (profileId: string): Promise<ImageDto[]> => {
    return await get<ImageDto[]>(`/images/profile/${profileId}`);
  },

  /**
   * Get all images for an album
   */
  getImagesByAlbumId: async (albumId: string): Promise<ImageDto[]> => {
    return await get<ImageDto[]>(`/images/album/${albumId}`);
  },

  /**
   * Upload an image file and link to post, album, or profile
   */
  uploadImage: async ({
    file,
    postId,
    albumId,
    profileId,
    makeProfilePicture,
  }: {
    file: File;
    postId?: string;
    albumId?: string;
    profileId?: string;
    makeProfilePicture?: boolean;
  }): Promise<ImageDto> => {
    const formData = new FormData();
    formData.append('image', file);
    if (postId) formData.append('postId', postId);
    if (albumId) formData.append('albumId', albumId);
    if (profileId) formData.append('profileId', profileId);
    if (typeof makeProfilePicture !== 'undefined')
      formData.append('makeProfilePicture', String(makeProfilePicture));
    const response = await apiClient.post<ImageDto>('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default imageService;
