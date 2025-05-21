import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 py-12 text-center">
      <h1 className="mb-2 text-9xl font-bold text-blue-400">404</h1>
      <h2 className="mb-4 text-3xl font-medium text-gray-100">Page Not Found</h2>
      <p className="mb-8 text-lg text-gray-400">
        {"The page you are looking for doesn't exist or has been moved."}
      </p>
      <Link
        to="/"
        className="rounded-md bg-blue-600 px-4 py-2 text-gray-100 transition-colors hover:bg-blue-500"
      >
        Go to Home
      </Link>
    </div>
  );
}
