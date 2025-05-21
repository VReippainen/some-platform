import express from 'express';
import FeedService from '../services/FeedService';
import { authenticate } from '../middleware/authMiddleware';
const router = express.Router();

// Get feed for a profile
router.get('/', authenticate, async (req, res, next) => {
  /*
    #swagger.tags = ['Feed']
    #swagger.path = '/feed'
  */
  try {
    const profileId = req.query.profileId as string;
    if (!profileId) {
      res.status(400).json({ error: 'profileId is required' });
      return;
    }
    const posts = await FeedService.getPostsByProfileId();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

export default router; 