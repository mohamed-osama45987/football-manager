import bcrypt from "bcrypt";
import { User } from "../models/User";
import { generateJwtToken } from "../utils/generateJwtToken";
import { agenda } from "../jobs/agenda";
import { Team } from "../models/Team";
import { AgendaJobs } from "../jobs/agenda";
import { HttpError } from "../utils/httpError";

export const loginOrRegister = async ({ email, password }: { email: string, password: string }) => {

    let user = await User.findOne({ email });
    if (!user) {
        const hashed = await bcrypt.hash(password, 10);
        const userName = email.split('@')[0];
        user = await User.create({ email, password: hashed, name: userName });
        const team = await Team.create({ userId: user._id, teamName: `${userName} FC` });
        agenda.now(AgendaJobs.generatePlayers, { teamId: team._id, userId: user._id })
    } else {
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new HttpError(401, 'Invalid credentials');
        }
    }
    const token = generateJwtToken(user._id.toString());
    return token;

}