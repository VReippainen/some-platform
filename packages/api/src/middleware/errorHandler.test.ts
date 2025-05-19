import { describe, it, expect, vi, beforeEach } from 'vitest';
import { errorHandler, AppError } from './errorHandler';
import type { Request, Response } from 'express';

// Helper to create a mock Response
function createMockRes() {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res as Response;
}

describe('errorHandler', () => {
  let res: Response;
  let req: Request;

  beforeEach(() => {
    res = createMockRes();
    req = {} as Request;
    vi.clearAllMocks();
  });

  it('handles AppError', () => {
    const err = new AppError('Test error', 400);
    errorHandler(err, req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Test error',
    });
  });

  it('handles JsonWebTokenError', () => {
    const err = { name: 'JsonWebTokenError', message: 'jwt malformed' } as Error;
    errorHandler(err, req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Invalid token. Please log in again!',
    });
  });

  it('handles TokenExpiredError', () => {
    const err = { name: 'TokenExpiredError', message: 'jwt expired' } as Error;
    errorHandler(err, req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Your token has expired. Please log in again!',
    });
  });

  it('handles unknown errors (default 500)', () => {
    const err = new Error('Unknown error');
    errorHandler(err, req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Something went wrong!',
    });
  });
}); 