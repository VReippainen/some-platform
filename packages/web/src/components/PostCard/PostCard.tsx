import { useImages } from '../../hooks';
import Card from '../Card/Card';
import type { PostCardProps } from './types';

function ImageLoader({ imageIds }: { imageIds?: string[] }) {
  const { data: images, isLoading } = useImages(imageIds);

  if (isLoading) {
    return <div className="w-full aspect-square bg-gray-700 animate-pulse" />;
  }
  if (images?.length === 0) {
    return null;
  }
  return (
    <div className="w-full">
      {(images ?? []).map((image) => (
        <img key={image.id} src={image.url} alt="Post media" className="w-full object-cover" />
      ))}
    </div>
  );
}

function PostCard({
  username,
  avatarUrl,
  content,
  imageIds,
  timestamp,
  actions,
  className = '',
}: PostCardProps) {
  return (
    <Card className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-3 px-4">
        <img
          src={avatarUrl}
          alt={username + ' avatar'}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-white">{username}</div>
          <div className="text-xs text-gray-400">{timestamp}</div>
        </div>
      </div>
      {imageIds && <ImageLoader imageIds={imageIds} />}
      <div className="text-gray-100 whitespace-pre-line px-4 text-sm">{content}</div>
      {actions && <div className="flex gap-2 mt-2">{actions}</div>}
    </Card>
  );
}

export default PostCard;
