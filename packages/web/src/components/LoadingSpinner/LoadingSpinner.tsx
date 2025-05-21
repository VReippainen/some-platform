interface LoadingSpinnerProps {
  className?: string;
}

function LoadingSpinner({ className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center py-8 ${className}`}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}

export default LoadingSpinner;
