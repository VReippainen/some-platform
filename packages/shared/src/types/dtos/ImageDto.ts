export interface ImageDto {
    id: string;
    url: string;
    blobName: string;
    createdAt: string;
    updatedAt?: string;
    profileId?: string | null;
    postId?: string | null;
    albumId?: string | null;
  }
  