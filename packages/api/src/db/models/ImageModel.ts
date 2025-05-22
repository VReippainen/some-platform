import { PrismaClient, Image as DbImage } from '@prisma/client';
import { ImageDto } from '@social-platform/shared';
const prisma = new PrismaClient();

export interface CreateImageDto {
  blobUrl: string;
  blobName: string;
  contentType: string;
  size: number;
  profileId?: string | null;
  postId?: string | null;
  albumId?: string | null;
}

class ImageModel {
  public toImage(image: DbImage): ImageDto {
    return {
      id: image.id,
      url: image.blobUrl,
      blobName: image.blobName,
      createdAt: image.createdAt.toISOString(),
      updatedAt: image.updatedAt?.toISOString(),
      profileId: image.profileId,
      postId: image.postId,
      albumId: image.albumId,
    };
  }

  async findById(id: string): Promise<ImageDto | null> {
    const image = await prisma.image.findUnique({ where: { id } });
    return image ? this.toImage(image) : null;
  }

  async findByPostId(postId: string): Promise<ImageDto[]> {
    const images = await prisma.image.findMany({ where: { postId } });
    return images.map(this.toImage);
  }

  async findByAlbumId(albumId: string): Promise<ImageDto[]> {
    const images = await prisma.image.findMany({ where: { albumId } });
    return images.map(this.toImage);
  }

  async findByProfileId(profileId: string): Promise<ImageDto[]> {
    const images = await prisma.image.findMany({ where: { profileId } });
    return images.map(this.toImage);
  }

  async create(data: CreateImageDto): Promise<ImageDto> {
    const image = await prisma.image.create({
      data: {
        blobUrl: data.blobUrl,
        blobName: data.blobName,
        contentType: data.contentType,
        size: data.size,
        profileId: data.profileId,
        postId: data.postId,
        albumId: data.albumId,
      },
    });
    return this.toImage(image);
  }

  async update(id: string, updates: Partial<Omit<ImageDto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ImageDto | null> {
    const image = await prisma.image.update({
      where: { id },
      data: updates,
    });
    return image ? this.toImage(image) : null;
  }

  async delete(id: string): Promise<void> {
    await prisma.image.delete({ where: { id } });
  }
}

export default new ImageModel(); 