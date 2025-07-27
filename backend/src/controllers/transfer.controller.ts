import { Request, Response } from 'express';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { HttpError } from '../utils/httpError';

export interface IGetTransferListArgs {
    userName: string;
    currentUserId: string;
    playerName?: any;
    teamName?: any;
    maxPrice?: any;
}

export const getTransferList = async ({
    currentUserId,
    playerName,
    teamName,
    maxPrice,
    page = 1,
    limit = 10,
}: IGetTransferListArgs & { page?: number; limit?: number }) => {
    const skip = (page - 1) * limit;

    const filterConditions: { [key: string]: any } = {
        userId: { $ne: currentUserId },
        forSale: true,
    };


    if (playerName) {
        filterConditions["name"] = { $regex: decodeURIComponent(teamName), $options: "i" };
    }

    if (maxPrice) {
        filterConditions["price"] = { $lte: Number(maxPrice) };
    }

    if (teamName) {
        const team = await Team.findOne({ teamName: decodeURIComponent(teamName) });
        if (!team) {
            throw new HttpError(404, 'Team not found');
        }
        filterConditions.teamId = team._id;
    }

    const [players, total] = await Promise.all([
        Player.find(filterConditions)
            .populate(['teamId', 'userId'])
            .skip(skip)
            .limit(limit),
        Player.countDocuments(filterConditions),
    ]);

    return {
        players,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
    };
};




export const listPlayerForSale = async ({ playerId, userId, askingPrice }: { playerId: string, userId: string, askingPrice: number }) => {
    const player = await Player.findById(playerId).populate(['teamId', 'teamId.userId']) as any;
    if (!player) {
        throw new HttpError(404, 'Player not found');
    }

    const userTeam = await Team.findOne({ userId });
    const isPlayerInUserTeam = player.teamId?.userId.toString() === userId;
    if (!userTeam || !isPlayerInUserTeam) {
        throw new HttpError(403, 'unauthorized');
    }

    const totalPlayers = await Player.countDocuments({
        teamId: player.teamId,
        _id: { $ne: player._id }
    });
    if (totalPlayers < 15) {
        throw new HttpError(403, 'Cannot list player. Team must have at least 15 players.');
    }

    player.forSale = true;
    player.askingPrice = askingPrice;
    await player.save();
    return player;
};

export const removePlayerFromSale = async ({ playerId, userId }: { playerId: string, userId: string }) => {
    const player = await Player.findById(playerId).populate(['teamId', 'teamId.userId']) as any;
    if (!player) {
        throw new HttpError(404, 'Player not found');
    }

    const userTeam = await Team.findOne({ userId });
    const isPlayerInUserTeam = player.teamId?.userId.toString() === userId;
    if (!userTeam || !isPlayerInUserTeam) {
        throw new HttpError(403, 'unauthorized');
    }

    player.forSale = false;
    player.askingPrice = 0;
    await player.save();
    return player;
};

export const buyPlayer = async ({ teamId, playerId }: { teamId: string, playerId: string }) => {
    const buyerTeam = await Team.findById(teamId);
    const player = await Player.findById(playerId);

    if (!player || !player.forSale) {
        throw new HttpError(404, 'Player not found or not for sale');
    }
    if (player.teamId?.toString() === buyerTeam?._id.toString()) {
        throw new HttpError(400, 'Player already in your team');
    }


    const totalPlayers = await Player.countDocuments({
        teamId: player.teamId
    });

    if (totalPlayers + 1 < 15) {
        throw new HttpError(400, 'Cannot buy player. Team must have at most 25 players.');
    }

    const price = Math.floor(player.askingPrice as number * 0.95)
    if (buyerTeam!.budget < price) {
        throw new HttpError(400, 'Not enough budget');
    }

    const sellerTeam = await Team.findById(player.teamId);

    sellerTeam!.budget += price;
    buyerTeam!.budget -= price;
    player.teamId = buyerTeam!._id as any;
    player.forSale = false;
    player.askingPrice = 0;

    await Promise.all([sellerTeam!.save(), buyerTeam!.save(), player.save()]);
    return "success buy";
};
