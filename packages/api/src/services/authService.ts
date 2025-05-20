import jwt from 'jsonwebtoken';
import UserModel from '../db/models/User';
import ProfileModel from '../db/models/Profile';
import config from '../config/config';
import { RegisterUserDto, TokenDto, UserDto } from '@social-platform/shared';

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

interface RegisterInput {
  username: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  genderOther?: string;
  bio?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

class AuthService {
  // Generate a JWT token for a user
  private generateToken(user: UserDto): string {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    // Type assertion to bypass type checking issues
    // @ts-expect-error jwt.sign type mismatch with config.jwt.secret, expected string
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

 

  // Register a new user
  async register(input: RegisterInput): Promise<TokenDto> {
     // Check if email is already registered
     const existingEmail = await UserModel.findByEmail(input.email);
     if (existingEmail) {
       throw new AuthenticationError('Email is already registered');
     }
    // Check if username is already taken
    const existingUsername = await ProfileModel.findByUsername(input.username);
    if (existingUsername) {
      throw new AuthenticationError('Username is already taken');
    }

   

    // Create new user
    const userData: RegisterUserDto = {
      username: input.username,
      email: input.email,
      password: input.password,
      gender: input.gender,
      genderOther: input.genderOther,
      bio: input.bio,
    };

    const user = await UserModel.create(userData);
    await ProfileModel.create(userData, user);
    const token = this.generateToken(user);
    

    return {
      token,
    };
  }

  // Login user
  async login(input: LoginInput): Promise<TokenDto> {
    // Verify password
    const isPasswordValid = await UserModel.verifyPassword(
      input.email,
      input.password
    );

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid username or password');
    }

    const user = await UserModel.findByEmail(input.email);
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    // Generate token
    const token = this.generateToken(user);

    return {
      token,
    };
  }

  // Verify a token and return the user
  async verifyToken(token: string): Promise<UserDto> {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as { userId: string };
      const user = await UserModel.findById(decoded.userId);

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      return user;
    } catch {
      throw new AuthenticationError('Invalid or expired token');
    }
  }

  // Logout user (update online status)
  async logout(): Promise<boolean> {
    return true;
  }
}

export default new AuthService(); 