import { get, patch, post } from './apiClient';
import type { LoginInput } from '../types/auth';
import {
  TokenResponse,
  UserResponse,
  type CreateUserDto,
  type UpdateUserDto,
  type UserDto,
} from '@social-platform/shared';
import { logger } from '../utils/logger';
const authService = {
  /**
   * Login a user
   */
  login: async (data: LoginInput): Promise<void> => {
    const response = await post<TokenResponse>('/auth/login', data);
    const { token } = response.data;
    // Store the token and user ID
    localStorage.setItem('token', token);
  },

  /**
   * Register a new user
   */
  pxregister: async (data: CreateUserDto): Promise<void> => {
    const response = await post<TokenResponse>('/auth/register', data);
    const { token } = response.data;

    // Store the token and user ID
    localStorage.setItem('token', token);
  },

  /**
   * Get current user data
   */
  getCurrentUser: async (): Promise<UserDto> => {
    const response = await get<UserResponse>('/auth/me');
    return response.data[0];
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: UpdateUserDto): Promise<UserDto> => {
    const response = await patch<UserResponse>('/auth/profile', data);
    return response.data[0];
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: string): Promise<UserDto> => {
    const response = await get<UserResponse>(`/users/${id}`);
    return response.data[0];
  },

  /**
   * Logout the user
   */
  logout: async (): Promise<void> => {
    try {
      await post('/auth/logout');
    } catch (error) {
      logger.error('Logout error:', error);
    }
    localStorage.removeItem('token');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
