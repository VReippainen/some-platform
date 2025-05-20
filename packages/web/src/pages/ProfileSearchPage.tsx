import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchProfiles, useCurrentProfile } from '../hooks/useProfile';
import type { ProfileDto } from '@social-platform/shared';

export function ProfileSearchPage() {
  const [query, setQuery] = useState('');
  const { data: currentProfile } = useCurrentProfile();
  const { data: profiles, isLoading } = useSearchProfiles(query);
  const navigate = useNavigate();

  if (!currentProfile) {
    // Not authenticated or still loading
    return null;
  }

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
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : profiles && profiles.length > 0 ? (
        <ul className="divide-y rounded bg-white shadow">
          {profiles.map((profile: ProfileDto) => (
            <li
              key={profile.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                void navigate(`/profile/${profile.id}`);
              }}
            >
              <span className="font-medium">{profile.username}</span>
              <span className="text-sm text-gray-500 capitalize">{profile.gender}</span>
            </li>
          ))}
        </ul>
      ) : query.trim() ? (
        <div className="rounded-md bg-gray-50 py-8 text-center">
          <p className="text-gray-500">No profiles found.</p>
        </div>
      ) : null}
    </div>
  );
}
