import { PencilIcon } from '@heroicons/react/24/outline';
import Button from '../Button/Button';
import type { ProfileDto } from '@social-platform/shared';
import GenderIndicator from '../ProfileCard/GenderIndicator';
import { getAvatarUrl } from '../../utils/getAvatarUrl';

interface ProfileHeaderProps {
  profile: ProfileDto;
  isCurrentUser: boolean;
  onEditClick?: () => void;
  className?: string;
}

function ProfileHeader({
  profile,
  isCurrentUser,
  onEditClick,
  className = '',
}: ProfileHeaderProps) {
  return (
    <div
      className={`mb-6 overflow-hidden rounded-lg bg-gray-900 border border-gray-800 ${className}`}
    >
      <div className="h-32 bg-gradient-to-r from-blue-900 to-purple-900"></div>
      <div className="relative px-4 py-5 sm:px-6">
        <div className="absolute -mt-16 flex">
          <div className="flex">
            <img
              src={getAvatarUrl(profile.username)}
              alt={`${profile.username} avatar`}
              className="h-24 w-24 rounded-full border-4 border-gray-900 bg-gray-800"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-100 m-0 flex items-center">
                {profile.username}
              </h2>
              <GenderIndicator gender={profile.gender} />
              {profile.genderOther && (
                <span className="text-gray-400 text-sm">({profile.genderOther})</span>
              )}
            </div>
            {profile.bio && <p className="mt-2 text-gray-300">{profile.bio}</p>}
          </div>
          {isCurrentUser && (
            <div>
              <Button variant="primary" onClick={onEditClick}>
                <PencilIcon className="mr-1 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
