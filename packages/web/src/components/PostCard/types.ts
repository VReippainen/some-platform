import type { ReactNode } from 'react';

export type PostCardProps = {
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
  actions?: ReactNode;
  className?: string;
};
