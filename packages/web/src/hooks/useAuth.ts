import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { LoginInput } from '../types/auth';
import authService from '../services/authService';
import type { CreateUserDto, UpdateUserDto } from '@social-platform/shared';

/**
 * Hook to get the current user
 */
export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
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
 * Hook to login a user
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      await authService.login(data);
      const user = await authService.getCurrentUser();
      return user;
    },
    onSuccess: async (user) => {
      // Update the current user in the cache
      queryClient.setQueryData(['currentUser'], user);
      // Invalidate any user-related queries
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      // Navigate to profile page
      void navigate(`/profile/${user.id}`);
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
    mutationFn: async (data: CreateUserDto) => {
      await authService.pxregister(data);
      return authService.getCurrentUser();
    },
    onSuccess: async (user) => {
      // Update the current user in the cache
      queryClient.setQueryData(['currentUser'], user);
      // Invalidate any user-related queries
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      // Navigate to profile page
      void navigate(`/profile/${user.id}`);
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
 * Hook to get a user by ID
 */
export const useUserById = (id: string) => {
  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => authService.getUserById(id),
    enabled: !!id,
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};

/**
 * Hook to update a user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => authService.updateProfile(data),
    onSuccess: async (updatedUser) => {
      // Update the current user in the cache
      queryClient.setQueryData(['currentUser'], updatedUser);
      // Update the user data in the cache
      queryClient.setQueryData(['user', updatedUser.id], updatedUser);
      // Invalidate queries
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      await queryClient.invalidateQueries({ queryKey: ['user', updatedUser.id] });
    },
  });
};

/**
 * Helper hook to check if a user is authenticated
 */
export const useIsAuthenticated = () => {
  const { data: user, isLoading } = useCurrentUser();
  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  };
};
