import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';
import { TOO_MANY_REQUESTS } from '@shared/errors/Errors';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  respose: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError(TOO_MANY_REQUESTS, 429);
  }
}
