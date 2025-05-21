import type { ReactNode } from 'react';

export type CardProps = {
  children: ReactNode;
  className?: string;
};

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`w-full bg-gray-800 rounded-lg shadow-md p-4 ${className}`} role="region">
      {children}
    </div>
  );
}

export default Card;
