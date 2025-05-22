import express from 'express';
import multer from 'multer';
import ImageService from '../services/ImageService';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer();

// Upload image
router.post('/', upload.single('image'), authenticate, async (req, res, next) => {
  console.log('req.file', req.file);
  /*
    #swagger.tags = ['Images']
    #swagger.path = '/images'
    #swagger.summary = 'Upload image and link to post, album, or profile (doesn't work in swaggger)'
  */
   
  try {
    if (!req.file) {
      console.log('No image file provided');
      res.status(400).json({ message: 'No image file provided' });
      return;
    }
    const { postId, albumId, profileId } = req.body;
    const image = await ImageService.uploadImage({
      file: req.file,
      postId,
      albumId,
      profileId,
    });
    res.status(201).json(image);
  } catch (error) {
    next(error);
  }
});

// Get image by ID
router.get('/:imageId', authenticate, async (req, res, next) => {
  /*
    #swagger.tags = ['Images']
    #swagger.path = '/images/{imageId}'
    #swagger.summary = 'Get image by ID'
  */
  try {
    const image = await ImageService.getImageById(req.params.imageId);
    if (!image) {
      res.status(404).json({ message: 'Image not found' });
      return;
    }
    res.status(200).json(image);
  } catch (error) {
    next(error);
  }
});

router.delete('/:imageId', authenticate, async (req, res, next) => {
  /*
    #swagger.tags = ['Images']
    #swagger.path = '/images/{imageId}'
    #swagger.summary = 'Delete image by ID'
  */
  try {
    await ImageService.deleteImage(req.params.imageId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get images by profileId
router.get('/profile/:profileId', authenticate, async function (req, res, next) {
  /*
    #swagger.tags = ['Images']
    #swagger.path = '/images/profile/{profileId}'
    #swagger.summary = 'Get all images for a profile'
  */
  try {
    const images = await ImageService.getImagesByProfileId(req.params.profileId);
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
});

// Get images by postId
router.get('/post/:postId', authenticate, async function (req, res, next) {
  /*
    #swagger.tags = ['Images']
    #swagger.path = '/images/post/{postId}'
    #swagger.summary = 'Get all images for a post'
  */
  try {
    const images = await ImageService.getImagesByPostId(req.params.postId);
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
});

// Get images by albumId
router.get('/album/:albumId', authenticate, async function (req, res, next) {
  /*
    #swagger.tags = ['Images']
    #swagger.path = '/images/album/{albumId}'
    #swagger.summary = 'Get all images for an album'
  */
  try {
    const images = await ImageService.getImagesByAlbumId(req.params.albumId);
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
});

export default router; 