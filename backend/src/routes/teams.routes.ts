
import express, { NextFunction, Response, Request } from 'express';
import { listTeam } from '../controllers/team.controller';
import { authenticatedRequest } from '../utils/types';
import { authMiddleware } from '../middlewares/auth.middleware';
import Joi from "joi";


const handleListTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            page: Joi.number().min(1).optional(),
            limit: Joi.number().min(1).max(100).optional(),
        });

        const { error, value } = schema.validate(req.query);
        if (error) {
            throw new Error(error.message);
        }

        const { page = 1, limit = 10 } = value;
        const { userId } = req as unknown as authenticatedRequest;

        const team = await listTeam({ userId, page, limit });
        res.json(team);
    } catch (err) {
        next(err);
    }
};


const router = express.Router();
router.use(authMiddleware);
router.get('/', handleListTeam);
export default router;
