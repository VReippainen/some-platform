import express, { Request } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import { ProfileResponse, ProfilesResponse } from '@social-platform/shared';
import ProfileModel from '../db/models/Profile';

const router = express.Router();

// Search profiles
router.get('/search', authenticate, async (req, res, next) => {
  try {
    // #swagger.tags = ['Profiles']
    // #swagger.path = '/profiles/search'
   
    const query = req.query.q as string;
    
    if (!query) {
      throw new AppError('Search query is required', 400);
    }
    
    const profiles = await ProfileModel.search(query);
    const response = new ProfilesResponse(profiles);
    
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


router.get('/me', authenticate, async (req: Request, res, next) => {
  // #swagger.tags = ['Profiles']
  // #swagger.path = '/profiles/me'
  try {
    const profiles = await ProfileModel.findByUserId(req.user!.id);
    if (profiles == null || profiles.length === 0) {
      throw new AppError('Profile not found', 404);
    }
    const response = new ProfilesResponse(profiles);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Get profile by ID
router.get('/:id', async (req, res, next) => {
  try {
    // #swagger.tags = ['Profiles']
    // #swagger.path = '/profiles/{id}'
    
    const profileId = req.params.id;
    
    const profile = await ProfileModel.findById(profileId);
    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    const response = new ProfileResponse(profile);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router; 