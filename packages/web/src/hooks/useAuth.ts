import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { LoginInput } from '../types/auth';
import authService from '../services/authService';
import type { RegisterUserDto } from '@social-platform/shared';
import { useCurrentProfile } from './useProfile';

/**
 * Hook to login a user
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      await authService.login(data);
      const profile = await authService.getCurrentProfile();
      return profile;
    },
    onSuccess: async (user) => {
      // Update the current user in the cache
      queryClient.setQueryData(['currentUser'], user);
      // Invalidate any user-related queries
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      // Navigate to profile page
      void navigate('/');
    },
  });
};

/**
 * Hook to register a new user
 */
export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterUserDto) => {
      await authService.register(data);
      return authService.getCurrentProfile();
    },
    onSuccess: async (profile) => {
      // Update the current user in the cache
      queryClient.setQueryData(['currentProfile'], profile);
      // Invalidate any user-related queries
      await queryClient.invalidateQueries({ queryKey: ['currentProfile'] });
      // Navigate to profile page
      void navigate('/');
    },
  });
};

/**
 * Hook to logout a user
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear the user from the cache
      queryClient.removeQueries({ queryKey: ['currentUser'] });
      // Navigate to login page
      void navigate('/login');
    },
  });
};

/**
 * Helper hook to check if a user is authenticated
 */
export const useIsAuthenticated = () => {
  const { data: profile, isLoading } = useCurrentProfile();
  return {
    isAuthenticated: !!profile,
    isLoading,
    profile,
  };
};
