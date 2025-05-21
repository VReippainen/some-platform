import { useCurrentProfile } from '../hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import { PostForm } from '../components/PostForm';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import Button from '../components/Button/Button';

export function PostNewPage() {
  const { data: profile, isLoading, error } = useCurrentProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error || !profile) {
    return <ErrorMessage message="Failed to load profile. Please try again later." />;
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Button
        variant="text"
        onClick={() => {
          void navigate(-1);
        }}
      >
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <PostForm
        profileId={profile.id}
        onSuccess={() => {
          void navigate(`/profiles/${profile.id}`);
        }}
      />
    </div>
  );
}
