import request from "supertest";
import app from "../app";
import { createUserAndGetToken } from "../utils/testUtils";
import { Team } from "../models/Team";
import { Player } from "../models/Player";

describe("Team Routes", () => {
    let token: string;
    let userId: string;

    beforeAll(async () => {
        const { token: userToken, user } = await createUserAndGetToken("teamtest@example.com", "password", false);
        token = userToken;
        userId = user._id.toString();
        const team = await Team.create({ userId, teamName: "Test FC", budget: 1000000 });
        await Player.insertMany(
            Array.from({ length: 3 }).map((_, i) => ({
                name: `Player ${i + 1}`,
                position: "Midfielder",
                price: 100000,
                userId,
                teamId: team._id,
            }))
        );
    });


    it("returns the team and players", async () => {
        const res = await request(app)
            .get("/api/v1/team")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);
        expect(res.body.team.teamName).toBe("Test FC");
        expect(res.body.players.length).toBeGreaterThan(0);
        expect(res.body.totalClubValue).toBeDefined();
    });
});
