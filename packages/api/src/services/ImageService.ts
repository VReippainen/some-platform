import ImageModel from '../db/models/ImageModel';
import { ImageDto } from '@social-platform/shared';
import BlobService from './blobService';

export interface UploadImageOptions {
  file: Express.Multer.File;
  postId?: string;
  albumId?: string;
  profileId?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateImageOptions {
  albumId?: string | null;
  postId?: string | null;
  profileId?: string | null;
  metadata?: Record<string, unknown>;
}

class ImageService {
  static createBlobName(): string {
    return `${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;
  }

  static async uploadImage(options: UploadImageOptions): Promise<ImageDto> {
    const { file, postId, albumId, profileId } = options;
    const blobName = this.createBlobName();

    // Upload file to Azure Blob Storage
    const blobUrl = await BlobService.createBlob(blobName, file.buffer, file.mimetype);
    // Save image metadata to database
    const image = await ImageModel.create({
      blobUrl,
      blobName,
      contentType: file.mimetype,
      size: file.size,
      postId,
      albumId,
      profileId,
    });

    return await this.addSignedUrlToImage(image);
  }

  static async addSignedUrlToImage(image: ImageDto): Promise<ImageDto> {
    const url = await BlobService.generateSignedUrl(image.blobName);
    return {
      ...image,
      url,
    };
  }

  static async getImageById(imageId: string): Promise<ImageDto | null> {
    const image = await ImageModel.findById(imageId);
    if (!image) {
      throw new Error('Image not found');
    }
    return this.addSignedUrlToImage(image);
  }

  static async getImagesByPostId(postId: string): Promise<ImageDto[]> {
    const images = await ImageModel.findByPostId(postId);
    return Promise.all(images.map(this.addSignedUrlToImage));
  }

  static async getImagesByAlbumId(albumId: string): Promise<ImageDto[]> {
    const images = await ImageModel.findByAlbumId(albumId);
    return Promise.all(images.map(this.addSignedUrlToImage));
  }

  static async getImagesByProfileId(profileId: string): Promise<ImageDto[]> {
    const images = await ImageModel.findByProfileId(profileId);
    return Promise.all(images.map(this.addSignedUrlToImage));
  }

  static async deleteImage(imageId: string): Promise<void> {
    const image = await ImageModel.findById(imageId);
    if (!image) {
      throw new Error('Image not found');
    }
    await BlobService.deleteBlob(image.blobName);
    await ImageModel.delete(imageId);
  }
/*
  static async updateImage(imageId: string, updates: UpdateImageOptions): Promise<ImageDto | null> {
    throw new Error('Not implemented');
  }

  static async addImageToAlbum(imageId: string, albumId: string): Promise<ImageDto> {
    throw new Error('Not implemented');
  }

  static async removeImageFromAlbum(imageId: string, albumId: string): Promise<ImageDto> {
    throw new Error('Not implemented');
  }

  static async addImageToPost(imageId: string, postId: string): Promise<ImageDto> {
    throw new Error('Not implemented');
  }

  static async removeImageFromPost(imageId: string, postId: string): Promise<ImageDto> {
    throw new Error('Not implemented');
  }

  static async generateWatermarkedImage(imageId: string, viewerUsername: string): Promise<Buffer> {
    throw new Error('Not implemented');
  }

  static async cacheWatermarkedImage(imageId: string, viewerUsername: string, buffer: Buffer): Promise<void> {
    throw new Error('Not implemented');
  }

  static validateImage(file: MulterFile): boolean {
    throw new Error('Not implemented');
  }

  static async getImageMetadata(imageId: string): Promise<Record<string, unknown>> {
    throw new Error('Not implemented');
  }
  static async setProfileImage(profileId: string, imageId: string): Promise<void> {
    // TODO: Implement
    throw new Error('Not implemented');
  }
*/
}

export default ImageService; 