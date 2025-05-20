import { get, post } from './apiClient';
import type { LoginInput } from '../types/auth';
import {
  ProfileResponse,
  ProfilesResponse,
  TokenResponse,
  type ProfileDto,
  type RegisterUserDto,
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
  register: async (data: RegisterUserDto): Promise<void> => {
    const response = await post<TokenResponse>('/auth/register', data);
    const { token } = response.data;

    // Store the token and user ID
    localStorage.setItem('token', token);
  },

  /**
   * Get current profile data
   */
  getCurrentProfile: async (): Promise<ProfileDto> => {
    const response = await get<ProfilesResponse>('/profiles/me');
    return response.data[0];
  },

  /**
   * Get profile by ID
   */
  getProfileById: async (id: string): Promise<ProfileDto> => {
    const response = await get<ProfileResponse>(`/profiles/${id}`);
    return response.data;
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
