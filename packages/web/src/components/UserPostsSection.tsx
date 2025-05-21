import { usePostsByProfile } from '../hooks/usePosts';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import PostCard from './PostCard/PostCard';
import type { ProfileDto } from '@social-platform/shared';

interface UserPostsSectionProps {
  profileId: string;
  profile: ProfileDto;
}

export function UserPostsSection({ profileId, profile }: UserPostsSectionProps) {
  const { data: posts, isLoading, error } = usePostsByProfile(profileId);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message="Failed to load posts. Please try again later." />;
  }
  if (!posts || posts.length === 0) {
    return <div className="text-gray-400 text-center py-8">No posts yet.</div>;
  }

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-left">Posts</h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            username={profile.username}
            avatarUrl={`https://api.dicebear.com/7.x/identicon/svg?seed=${profile.username}`}
            content={post.content}
            timestamp={new Date(post.createdAt).toLocaleString()}
          />
        ))}
      </div>
    </section>
  );
}
