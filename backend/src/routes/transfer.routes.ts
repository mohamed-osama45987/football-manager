import express, { NextFunction, Response, Request } from 'express';
import {
    getTransferList,
    listPlayerForSale,
    removePlayerFromSale,
    buyPlayer,
    IGetTransferListArgs,
} from '../controllers/transfer.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import joi from 'joi';
import { authenticatedRequest } from '../utils/types';
import { Team } from "../models/Team";
import { HttpError } from '../utils/httpError';


const handleGetTransferList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = joi.object({
            playerName: joi.string().optional().allow('').max(50),
            teamName: joi.string().optional().allow('').max(50),
            maxPrice: joi.number().optional().allow(''),
            page: joi.number().required().min(1),
            limit: joi.number().required().min(1).max(100),
        });
        const { error } = schema.validate(req.query);

        if (error) {
            throw new Error(error.message);
        }
        const players = await getTransferList({ currentUserId: (req as unknown as authenticatedRequest).userId, ...req.query } as IGetTransferListArgs);
        res.status(200).json(players)
    } catch (err) {
        next(err)
    }
}

const handleListPlayerForSale = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = joi.object({
            playerId: joi.string().required(),
            askingPrice: joi.number().required().max(100_000_000),
        });
        const { error } = schema.validate({ ...req.body, ...req.params });
        if (error) {
            throw new Error(error.message);
        }
        const playerId = req.params.playerId;
        const askingPrice = req.body.askingPrice;
        const player = await listPlayerForSale({ playerId, askingPrice, userId: (req as unknown as authenticatedRequest).userId });
        res.status(200).json(player)
    } catch (err) {
        next(err)
    }
}

const handleUnlistPlayer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = joi.object({
            playerId: joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            throw new Error(error.message);
        }
        const playerId = req.params.playerId;
        const player = await removePlayerFromSale({ playerId, userId: (req as unknown as authenticatedRequest).userId });
        res.status(200).json(player)
    } catch (err) {
        next(err)
    }
}


const handleBuyPlayer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = joi.object({
            playerId: joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            throw new Error(error.message);
        }
        const playerId = req.params.playerId;
        const team = await Team.findOne({ userId: (req as unknown as authenticatedRequest).userId });
        if (!team) {
            throw new HttpError(404, 'Team not found');
        }
        const player = await buyPlayer({ playerId, teamId: team!._id.toString() });
        res.status(200).json(player)
    } catch (err) {
        next(err)
    }
}


const router = express.Router();
router.use(authMiddleware)
router.get('/', handleGetTransferList);
router.post('/sell/:playerId', handleListPlayerForSale);
router.post('/unsell/:playerId', handleUnlistPlayer);
router.post('/buy/:playerId', handleBuyPlayer);
export default router;
