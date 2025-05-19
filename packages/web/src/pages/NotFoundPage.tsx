import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="mb-2 text-9xl font-bold text-blue-600">404</h1>
      <h2 className="mb-4 text-3xl font-medium text-gray-900">Page Not Found</h2>
      <p className="mb-8 text-lg text-gray-600">
        {"The page you are looking for doesn't exist or has been moved."}
      </p>
      <Link to="/" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Go to Home
      </Link>
    </div>
  );
}
