import express, { Request } from 'express';
import { AppError } from '../middleware/errorHandler';
import PostService from '../services/PostService';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();


router.get('/profile/:profileId', async (req, res, next) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.path = '/posts/profile/{profileId}'
  */
  try {
    const profileId = req.params.profileId;
    const posts = await PostService.getPostsByProfileId(profileId);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

// Get post by ID
router.get('/:id', async (req, res, next) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.path = '/posts/{id}'
  */
  try {
    const postId = req.params.id;
    const post = await PostService.getPostById(postId);
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// Create post
router.post('/', authenticate, async (req: Request, res, next) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.path = '/posts'
  */
  try {
    const { profileId, content } = req.body;
    if (!profileId || !content) {
      throw new AppError('profileId and content are required', 400);
    }
    const post = await PostService.createPost({ profileId, content });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// Update post
router.put('/:id', authenticate, async (req: Request, res, next) => {
  try {
    /*
      #swagger.tags = ['Posts']
      #swagger.path = '/posts/{id}'
    */
    const postId = req.params.id;
    const { content } = req.body;
    if (!content) {
      throw new AppError('content is required', 400);
    }
    const post = await PostService.updatePost(postId, content);
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// Delete post
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    /*
      #swagger.tags = ['Posts']
      #swagger.path = '/posts/{id}'
    */
    const postId = req.params.id;
    await PostService.deletePost(postId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});


export default router; 
