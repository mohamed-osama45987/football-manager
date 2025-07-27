import { Player } from "../models/Player";
import { Team } from "../models/Team";
import { HttpError } from "../utils/httpError";
import { isPlayerGenerationInProgress } from "../jobs/agenda";

export const listTeam = async ({
    userId,
    page = 1,
    limit = 10,
}: {
    userId: string;
    page?: number;
    limit?: number;
}) => {
    const team = await Team.findOne({ userId });
    if (!team) throw new HttpError(404, 'Team not found');

    const skip = (page - 1) * limit;


    const [players, total, teamValueResult] = await Promise.all([
        Player.find({ teamId: team._id }).skip(skip).limit(limit),
        Player.countDocuments({ teamId: team._id }),
        Player.aggregate([
            { $match: { teamId: team._id } },
            { $group: { _id: null, total: { $sum: "$price" } } },
        ]),
    ]);

    const isTeamGenerationInProgress = await isPlayerGenerationInProgress(team._id.toString());

    const totalClubValue = teamValueResult[0]?.total || 0;
    return {
        team,
        players,
        page,
        limit,
        total,
        generatingTeam: isTeamGenerationInProgress,
        totalClubValue,
        totalPages: Math.ceil(total / limit),
    };
};
