import express, { Request } from 'express';
import authService from '../services/authService';
import { authenticate } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import UserModel from '../db/models/User';
import { BaseResponse, TokenResponse, UserResponse } from '@social-platform/shared';

const router = express.Router();


router.post('/register', async (req, res, next) => {
  try {
    // #swagger.tags = ['Authentication']
    // #swagger.path = '/auth/register'
    const { username, email, password, gender, genderOther, bio } = req.body;

    // Validation
    if (!username || !email || !password || !gender) {
      throw new AppError('Please provide username, email, password and gender', 400);
    }

    const token = await authService.register({
      username,
      email,
      password,
      gender,
      genderOther,
      bio
    });

    const response = new TokenResponse(token);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});


router.post('/login', async (req, res, next) => {
  try {
    // #swagger.tags = ['Authentication']
    // #swagger.path = '/auth/login'
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      throw new AppError('Please provide username and password', 400);
    }

    const token = await authService.login({ username, password });

    const response = new TokenResponse(token);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


router.get('/me', authenticate, async (req: Request, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.path = '/auth/me'
  const response = new UserResponse([req.user!]);
  res.status(200).json(response);
});


router.patch('/me', authenticate, async (req: Request, res, next) => {
  // #swagger.tags = ['Authentication']
  // #swagger.path = '/auth/profile'
  try {
    const { bio, genderOther } = req.body;
    const userId = req.user!.id;

    const user = await UserModel.update(userId, {
      bio,
      genderOther,
    });

    if (!user) {
      throw new AppError('Failed to update profile', 500);
    }

    const response = new UserResponse([user]);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/logout', authenticate, async (_, res, next) => {
  try {
    // #swagger.tags = ['Authentication']
    // #swagger.path = '/auth/logout'
    await authService.logout();

    const response = new BaseResponse({
      message: 'Logged out successfully'
    });

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router; 