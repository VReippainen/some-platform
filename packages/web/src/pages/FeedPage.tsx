import React, { useMemo } from 'react';
import { useCurrentProfile } from '../hooks/useProfile';
import { useFeed } from '../hooks/useFeed';
import PostCard from '../components/PostCard/PostCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import type { PostDto } from '@social-platform/shared/src/types/dtos/PostDto';
import { useQueries } from '@tanstack/react-query';
import profileService from '../services/profileService';
import { getAvatarUrl } from '../utils/getAvatarUrl';

export function FeedPage(): React.ReactElement {
  const {
    data: currentProfile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useCurrentProfile();
  const profileId = currentProfile?.id ?? '';
  const { data: feed, isLoading, error } = useFeed(profileId);

  // Fetch all author profiles in parallel
  const authorIds = useMemo(
    () => (feed ? Array.from(new Set(feed.map((post) => post.profileId))) : []),
    [feed],
  );
  const authorQueries = useQueries({
    queries: authorIds.map((id) => ({
      queryKey: ['profile', id],
      queryFn: () => profileService.getProfileById(id),
      enabled: !!id,
    })),
  });
  const isAuthorsLoading = authorQueries.some((q) => q.isLoading);
  const authorsById = useMemo(() => {
    const map: Record<string, { username: string }> = {};
    authorQueries.forEach((q, idx) => {
      if (q.data) {
        map[authorIds[idx]] = { username: q.data.username };
      }
    });
    return map;
  }, [authorQueries, authorIds]);

  if (isProfileLoading || isLoading || isAuthorsLoading) {
    return <LoadingSpinner />;
  }

  if (profileError) {
    return <ErrorMessage message="Failed to load profile. Please try again later." />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load feed. Please try again later." />;
  }

  if (!feed || feed.length === 0) {
    return <div className="text-gray-400 text-center mt-8">No posts in your feed yet.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {feed.map((post: PostDto) => {
        const username = authorsById[post.profileId].username;
        const avatarUrl = getAvatarUrl(username);
        return (
          <PostCard
            key={post.id}
            username={username}
            avatarUrl={avatarUrl}
            content={post.content}
            timestamp={new Date(post.createdAt).toLocaleString()}
          />
        );
      })}
    </div>
  );
}
