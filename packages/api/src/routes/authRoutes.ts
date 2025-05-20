import express from 'express';
import authService from '../services/authService';
import { authenticate } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import { BaseResponse, TokenResponse } from '@social-platform/shared';

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
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const token = await authService.login({ email, password });

    const response = new TokenResponse(token);
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