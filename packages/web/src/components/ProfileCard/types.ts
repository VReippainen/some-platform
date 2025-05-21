import type { ReactNode } from 'react';

export type ProfileCardProps = {
  username: string;
  avatarUrl: string;
  gender?: string;
  actions?: ReactNode;
  className?: string;
};
