import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { authenticatedRequest } from '../utils/types';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'No token provided' });
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
            (req as unknown as authenticatedRequest).userId = decoded.userId;
            next();
        }
    } catch {
        res.status(403).json({ error: 'Invalid token' });
    }
};