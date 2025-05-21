import { useQuery } from '@tanstack/react-query';
import authService from '../services/authService';
import profileService from '../services/profileService';

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
  const { data, isLoading, error } = useQuery({
    queryKey: ['searchProfiles', query],
    queryFn: () => profileService.searchProfiles(query),
    enabled: !!query,
  });

  return {
    data,
    isLoading,
    error,
  };
};
