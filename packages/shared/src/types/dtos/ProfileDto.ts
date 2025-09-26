export interface UpdateProfileDto {
  bio?: string;
  genderOther?: string;
  profileImageId?: string;
}

export interface ProfileDto {
  id: string;
  username: string;
  bio: string | null;
  gender: 'male' | 'female' | 'other';
  genderOther: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  profileImageId: string | null;
}