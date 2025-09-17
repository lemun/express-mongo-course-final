import pino from 'pino';
import { Request, Response, NextFunction } from 'express';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true
    }
  }
});

export function logRequests(req: Request, res: Response, next: NextFunction) {
  logger.info('New request: ' + req.method + ' ' + req.url);
  
  next();
}