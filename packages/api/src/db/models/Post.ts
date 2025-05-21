import { PrismaClient, Post as DbPost } from '@prisma/client';
import { PostDto } from '@social-platform/shared';
const prisma = new PrismaClient();


class PostModel {
  private toPost(post: DbPost): PostDto {
    return {
      id: post.id,
      profileId: post.profileId,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    };
  }

  async findById(id: string): Promise<PostDto | null> {
    const post = await prisma.post.findUnique({ where: { id } });
    return post ? this.toPost(post) : null;
  }

  async findByProfileId(profileId: string): Promise<PostDto[]> {
    const posts = await prisma.post.findMany({ where: { profileId } });
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
}

export default new PostModel(); 