import AppError from '@shared/errors/AppError';
import { INVALID_CREDENTIALS } from '@shared/errors/Errors';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import IJwtPayload from '../../../modules/users/interfaces/IJwtPayload';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(INVALID_CREDENTIALS);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = jwt.verify(
      token,
      String(process.env.JWT_SECRET),
    ) as IJwtPayload;

    request.user = {
      email: decodedToken.email,
      id: decodedToken.id,
      name: decodedToken.name,
    };

    return next();
  } catch (error) {
    throw new AppError(INVALID_CREDENTIALS);
  }
}
