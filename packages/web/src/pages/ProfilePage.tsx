import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCurrentProfile, useProfileById } from '../hooks/useProfile';
import Button from '../components/Button/Button';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: currentProfile } = useCurrentProfile();
  // Check if profile is the current user's profile
  const isCurrentUser = currentProfile?.id === id;

  // Fetch user profile
  const { data: profile, isLoading, error } = useProfileById(id ?? '');

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality when the feature is ready
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={() => {
          void navigate(-1);
        }}
      >
        <ArrowLeftIcon className="mr-2 h-5 w-5" />
        Back
      </Button>
      {/* Profile content */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message="Failed to load profile. Please try again later." />
      ) : profile ? (
        <div>
          <ProfileHeader
            profile={profile}
            isCurrentUser={isCurrentUser}
            onEditClick={handleEditProfile}
          />
        </div>
      ) : (
        <ErrorMessage message="Profile not found." />
      )}
    </div>
  );
}
