import { PrismaClient, Album as DbAlbum } from '@prisma/client';
const prisma = new PrismaClient();

// Temporary local AlbumDto type
export interface AlbumDto {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt?: string;
  profileId: string;
}

class AlbumModel {
  private toAlbum(album: DbAlbum): AlbumDto {
    return {
      id: album.id,
      name: album.name,
      description: album.description,
      createdAt: album.createdAt.toISOString(),
      updatedAt: album.updatedAt?.toISOString(),
      profileId: album.profileId,
    };
  }

  async findById(id: string): Promise<AlbumDto | null> {
    const album = await prisma.album.findUnique({ where: { id } });
    return album ? this.toAlbum(album) : null;
  }

  async findByProfileId(profileId: string): Promise<AlbumDto[]> {
    const albums = await prisma.album.findMany({ where: { profileId } });
    return albums.map(this.toAlbum);
  }

  async create(data: { name: string; description?: string | null; profileId: string }): Promise<AlbumDto> {
    const album = await prisma.album.create({
      data: {
        name: data.name,
        description: data.description,
        profileId: data.profileId,
      },
    });
    return this.toAlbum(album);
  }

  async update(id: string, updates: Partial<Omit<AlbumDto, 'id' | 'createdAt' | 'profileId'>>): Promise<AlbumDto | null> {
    const album = await prisma.album.update({
      where: { id },
      data: updates,
    });
    return album ? this.toAlbum(album) : null;
  }

  async delete(id: string): Promise<void> {
    await prisma.album.delete({ where: { id } });
  }
}

export default new AlbumModel(); 