export interface RegisterUserDto {
  bio?: string;
  genderOther?: string;
  username: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
}

export interface UserDto {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
}