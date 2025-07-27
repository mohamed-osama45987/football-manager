import { User } from "../models/User";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { generateJwtToken } from "../utils/generateJwtToken";
import bcrypt from "bcrypt";

export const createUserAndGetToken = async (email: string, password: string, withTeam = true, playerCount = 5) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name: email, password: hashedPassword });
    const token = generateJwtToken(user._id.toString());

    let team: any = null;
    let players: any = [];

    if (withTeam) {
        team = await Team.create({ userId: user._id, teamName: `${user.name} FC`, budget: 10_000_000 });

        const playerDocs = Array.from({ length: playerCount }).map((_, i) => ({
            name: `Player ${i + 1}`,
            position: ["Goalkeeper", "Defender", "Midfielder", "Attacker"][i % 4],
            price: Math.floor(Math.random() * 1_000_000 + 1_000_000),
            teamId: team._id,
            userId: user._id,
        }));

        players = await Player.insertMany(playerDocs);
    }

    return { user, token, team, players };
};
