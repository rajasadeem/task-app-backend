import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';
import logger from '../config/logger';
import { User } from '../types';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
      throw new Error('Authorization header is missing');

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) throw new Error('Invalid token format');

    const decoded = authService.verifyToken(token);

    if (!decoded) throw new Error('Authentication failed');

    Object.assign(req, { user: decoded });
    return next();
  } catch (error: any) {
    logger.error(error);
    return res.status(401).json({ message: error.message });
  }
};

export default auth;
