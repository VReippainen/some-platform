import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useCurrentProfile, useProfileById } from '../hooks/useProfile';

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: currentProfile } = useCurrentProfile();
  // Check if profile is the current user's profile
  const isCurrentUser = currentProfile?.id === id;

  // Fetch user profile
  const { data: profile, isLoading, error } = useProfileById(id ?? '');

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => {
          void navigate(-1);
        }}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
      >
        <ArrowLeftIcon className="mr-2 h-5 w-5" />
        Back
      </button>

      {/* Profile content */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            Failed to load profile. Please try again later.
          </div>
        </div>
      ) : profile ? (
        <div>
          {/* Profile header */}
          <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="relative px-4 py-5 sm:px-6">
              <div className="absolute -mt-16 flex">
                <div className="flex">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-500 text-2xl font-bold text-white">
                    {profile.username[0].toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
                  {profile.bio && <p className="mt-2 text-gray-700">{profile.bio}</p>}
                </div>
                {isCurrentUser && (
                  <button className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">
                    <PencilIcon className="mr-1 h-4 w-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-md bg-gray-50 py-8 text-center">
          <p className="text-gray-500">Profile not found.</p>
        </div>
      )}
    </div>
  );
}
