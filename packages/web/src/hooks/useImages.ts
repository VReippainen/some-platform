import { useQuery } from '@tanstack/react-query';
import imageService from '../services/imageService';
import type { ImageDto } from '@social-platform/shared/src/types/dtos/ImageDto';

export function useImages(imageIds: string[] = []) {
  return useQuery<ImageDto[]>({
    queryKey: ['images', 'ids', imageIds.sort().join(',')],
    queryFn: () => imageService.getImagesByIds(imageIds),
    enabled: imageIds.length > 0,
  });
}

export function useImagesByPostId(postId: string) {
  return useQuery<ImageDto[]>({
    queryKey: ['images', 'post', postId],
    queryFn: () => imageService.getImagesByPostId(postId),
    enabled: !!postId,
  });
}

export function useImagesByProfileId(profileId: string) {
  return useQuery<ImageDto[]>({
    queryKey: ['images', 'profile', profileId],
    queryFn: () => imageService.getImagesByProfileId(profileId),
    enabled: !!profileId,
  });
}

export function useImagesByAlbumId(albumId: string) {
  return useQuery<ImageDto[]>({
    queryKey: ['images', 'album', albumId],
    queryFn: () => imageService.getImagesByAlbumId(albumId),
    enabled: !!albumId,
  });
}
