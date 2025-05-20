import { useQuery } from '@tanstack/react-query';
import authService from '../services/authService';
import profileService from '../services/profileService';
import { useState, useEffect } from 'react';

/**
 * Hook to get the current user
 */
export const useCurrentProfile = () => {
  const query = useQuery({
    queryKey: ['currentProfile'],
    queryFn: () => profileService.getCurrentProfile(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: authService.isAuthenticated(),
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};

/**
 * Hook to get a user by ID
 */
export const useProfileById = (id: string) => {
  const query = useQuery({
    queryKey: ['profile', id],
    queryFn: () => profileService.getProfileById(id),
    enabled: !!id,
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};

/**
 * Hook to search profiles by username
 */
export const useSearchProfiles = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchProfiles', debouncedQuery],
    queryFn: () => profileService.searchProfiles(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  return {
    data,
    isLoading,
    error,
  };
};
