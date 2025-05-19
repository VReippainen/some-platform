import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import UserModel from '../db/models/User';
import { UserResponse } from '@social-platform/shared';

const router = express.Router();

// Search users - must come BEFORE /:id route to prevent conflict
router.get('/search', authenticate, async (req, res, next) => {
  try {
    // #swagger.tags = ['Users']
    // #swagger.path = '/users/search'
   
    
    const query = req.query.q as string;
    
    if (!query) {
      throw new AppError('Search query is required', 400);
    }
    
    const users = await UserModel.search(query);
    const response = new UserResponse(users);
    
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


// Get user by ID
router.get('/:id', async (req, res, next) => {
  try {
    // #swagger.tags = ['Users']
    // #swagger.path = '/users/{id}'
    
    const userId = req.params.id;
    
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const response = new UserResponse([user]);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router; 