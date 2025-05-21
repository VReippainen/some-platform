import { useQuery } from '@tanstack/react-query';
import feedService from '../services/feedService';
import type { PostDto } from '@social-platform/shared/src/types/dtos/PostDto';

export function useFeed(profileId: string) {
  return useQuery<PostDto[]>({
    queryKey: ['feed', profileId],
    queryFn: () => feedService.getFeed(profileId),
    enabled: !!profileId,
  });
}
