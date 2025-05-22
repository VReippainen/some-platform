import Card from '../Card/Card';
import type { PostCardProps } from './types';

function PostCard({
  username,
  avatarUrl,
  content,
  timestamp,
  imageUrl,
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
      <div className="text-gray-100 whitespace-pre-line px-4">{content}</div>
      {imageUrl && <img src={imageUrl} alt="Post media" className="w-full object-cover" />}
      {actions && <div className="flex gap-2 mt-2">{actions}</div>}
    </Card>
  );
}

export default PostCard;
