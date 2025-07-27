import { Agenda } from "agenda";
import { Player } from "../models/Player";
import dotenv from "dotenv";
import { Team } from "../models/Team";
import { faker } from "@faker-js/faker";
import { HttpError } from "../utils/httpError";

dotenv.config();

export const enum AgendaJobs {
    generatePlayers = "generatePlayers"
}
const positions = [
    { role: 'Goalkeeper', count: 3 },
    { role: 'Defender', count: 6 },
    { role: 'Midfielder', count: 6 },
    { role: 'Attacker', count: 5 },
];
export const agenda = new Agenda({
    db: {
        address: process.env.MONGO_URI as string,
        collection: 'agenda_jobs',
        options: {
            maxPoolSize: 10,
            minPoolSize: 1,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxIdleTimeMS: 30000,
        }
    },
    maxConcurrency: 3,
    defaultConcurrency: 1,
    processEvery: '30 seconds',
    defaultLockLifetime: 10 * 60 * 1000, // 10 minutes
});
agenda.define(AgendaJobs.generatePlayers, async (job: any, done: any) => {
    const userId = job.attrs.data.userId
    const teamId = job.attrs.data.teamId;
    if (!teamId) throw new HttpError(400, 'Team ID is required');
    try {
        const playersToInsert = [];
        for (const position of positions) {
            for (let i = 0; i < position.count; i++) {
                playersToInsert.push({
                    name: faker.person.fullName(),
                    position: position.role,
                    price: Math.floor(Math.random() * 1_000_000 + 1_000_001),
                    teamId,
                    userId,
                });

            }
        }
        await Player.insertMany(playersToInsert);
        done()
    }
    catch (err) {
        // clean up in case of error 
        const team = await Team.findOne({ _id: teamId });
        if (team) {
            await Team.deleteOne({ _id: teamId });
        }
        done(err);
    }
});

export const isPlayerGenerationInProgress = async (teamId: string) => {
    const jobs = await agenda.jobs(
        {

            data: { teamId },
            nextRunAt: { $ne: null },
        }
    );

    return jobs.length > 0;
};
