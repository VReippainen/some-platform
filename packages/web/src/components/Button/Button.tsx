import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariant } from './types';

const baseClass =
  'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 transition-colors';

const variantClasses = {
  primary:
    'flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-100 ring-1 ring-gray-700 hover:bg-gray-700',
  secondary:
    'flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-gray-200 ring-1 ring-gray-700 hover:bg-gray-700',
  text: 'bg-transparent text-blue-400 hover:text-blue-300 active:text-blue-500 focus:ring-blue-500',
  icon: 'p-2 bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900 focus:ring-gray-500',
};

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={`${baseClass} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
