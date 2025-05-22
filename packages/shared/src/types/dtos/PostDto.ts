import { ImageDto } from "./ImageDto";

export interface PostDto {
  id: string;
  profileId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  images?: ImageDto[];
      
} 