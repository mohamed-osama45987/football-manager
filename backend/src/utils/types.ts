import { Request } from 'express';
export interface authenticatedRequest extends Request {
    userId: string;
}