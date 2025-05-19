import { UserDto } from '@social-platform/shared';

declare module 'express' {
  interface Request {
    user?: UserDto;
  }
}