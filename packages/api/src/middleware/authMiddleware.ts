import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';
import { AppError } from './errorHandler';

export const authenticate = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError('No authentication token provided', 401);
    }

    // Extract token from header
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new AppError('Invalid authentication format', 401);
    }

    // Verify token and get user
    const user = await authService.verifyToken(token);
    
    req.user = user
    
    next();
  } catch (error) {
    next(error);
  }
}; 