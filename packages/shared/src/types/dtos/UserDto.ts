export interface UpdateUserDto {
  bio?: string;
  genderOther?: string;
}

export interface CreateUserDto extends UpdateUserDto {
  username: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
}

export interface UserDto {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  gender: 'male' | 'female' | 'other';
  genderOther: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}