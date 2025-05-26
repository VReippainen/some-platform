import type { ReactNode } from 'react';

export type PostCardProps = {
  postId: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  imageIds?: string[];
  actions?: ReactNode;
  className?: string;
};
