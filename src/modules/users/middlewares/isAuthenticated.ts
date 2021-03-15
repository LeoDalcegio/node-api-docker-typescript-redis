import AppError from "@shared/errors/AppError";
import { INVALID_CREDENTIALS } from "@shared/errors/Errors";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(INVALID_CREDENTIALS);
  }

  // TODO, Bearer hsduahudshaudhsadhus
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET));

    const { sub } = decodedToken;

    request.user = {
      
    }

    return next();
  } catch (error) {
    throw new AppError(INVALID_CREDENTIALS);
  }
}
