import { PrismaClient, Post as DbPost } from '@prisma/client';
import { PostDto } from '@social-platform/shared';
import type { Image } from '@prisma/client';
import ImageModel from './ImageModel';
const prisma = new PrismaClient();


class PostModel {
  private toPost(post: DbPost & { images?: Image[] }): PostDto {
    return {
      id: post.id,
      profileId: post.profileId,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
      images: post.images?.map(ImageModel.toImage) || [],
    };
  }

  async findById(id: string): Promise<PostDto | null> {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { images: true },
    });
    return post ? this.toPost(post) : null;
  }

  async findByProfileId(profileId: string): Promise<PostDto[]> {
    const posts = await prisma.post.findMany({
      where: { profileId },
      include: { images: true },
    });
    console.log('posts', posts);
    return posts.map(this.toPost);
  }

  async create(postData: { profileId: string; content: string }): Promise<PostDto> {
    const post = await prisma.post.create({
      data: {
        profileId: postData.profileId,
        content: postData.content,
      },
    });
    return this.toPost(post);
  }

  async update(id: string, content: string): Promise<PostDto | null> {
    const post = await prisma.post.update({
      where: { id },
      data: { content },
    });
    return post ? this.toPost(post) : null;
  }

  async delete(id: string): Promise<void> {
    await prisma.post.delete({ where: { id } });
  }

  async getAllPosts(): Promise<PostDto[]> {
    const posts = await prisma.post.findMany({ include: { images: true } });
    return posts.map(this.toPost);
  }
}

export default new PostModel(); 