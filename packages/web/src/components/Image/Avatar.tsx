import { useImages } from '../../hooks';
import { getAvatarUrl } from '../../utils/getAvatarUrl';

interface AvatarProps {
  profileImageId: string;
  username: string;
}

export function Avatar({ profileImageId, username }: AvatarProps) {
  const { data: images, isLoading } = useImages([profileImageId]);
  if (isLoading) {
    return <div className="w-full aspect-square bg-gray-700 animate-pulse" />;
  }
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <img
      src={images[0].url || getAvatarUrl(username)}
      alt={`${username} avatar`}
      className="h-24 w-24 rounded-full border-4 border-gray-900 bg-gray-800"
    />
  );
}
