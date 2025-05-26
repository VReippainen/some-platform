import type { ReactNode } from 'react';

export type CardProps = {
  children: ReactNode;
  className?: string;
};

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`w-full bg-black py-4 border-b-gray-500 border-b-1 ${className}`} role="region">
      {children}
    </div>
  );
}

export default Card;
