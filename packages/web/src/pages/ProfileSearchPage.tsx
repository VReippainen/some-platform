import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchProfiles, useCurrentProfile } from '../hooks/useProfile';
import type { ProfileDto } from '@social-platform/shared';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import { getAvatarUrl } from '../utils/getAvatarUrl';

export function ProfileSearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { data: currentProfile, isLoading: isCurrentProfileLoading } = useCurrentProfile();
  const { data: profiles, isLoading: isProfilesLoading } = useSearchProfiles(debouncedQuery);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  if (!currentProfile) {
    // Not authenticated or still loading
    return null;
  }

  const loading = isCurrentProfileLoading || isProfilesLoading;

  const getGender = (profile: ProfileDto) =>
    ['male', 'female'].includes(profile.gender) ? profile.gender : (profile.genderOther ?? '');

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Search Profiles</h1>
      <input
        type="text"
        className="w-full rounded border px-3 py-2 mb-6"
        placeholder="Search by username…"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }}
        autoFocus
      />
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : profiles && profiles.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {profiles.map((profile: ProfileDto) => (
            <div
              key={profile.id}
              className="cursor-pointer"
              onClick={() => {
                void navigate(`/profiles/${profile.id}`);
              }}
            >
              <ProfileCard
                username={profile.username}
                avatarUrl={getAvatarUrl(profile.username)}
                gender={getGender(profile)}
              />
            </div>
          ))}
        </div>
      ) : debouncedQuery.trim() ? (
        <div className="rounded-md bg-gray-50 py-8 text-center">
          <p className="text-gray-500">No profiles found.</p>
        </div>
      ) : null}
    </div>
  );
}
