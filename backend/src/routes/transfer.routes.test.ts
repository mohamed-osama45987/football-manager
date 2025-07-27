import request from "supertest";
import { Player } from "../models/Player";
import { Team } from "../models/Team";
import { createUserAndGetToken } from "../utils/testUtils";
import app from "../app";

describe("Transfer Routes", () => {
    let buyerToken: string;

    beforeAll(async () => {
        const { user: seller } = await createUserAndGetToken("seller@example.com", "123456");
        const { token: buyerT } = await createUserAndGetToken("buyer@example.com", "123456");

        buyerToken = buyerT;

        const sellerTeam = await Team.create({ userId: seller._id, teamName: "Seller FC", budget: 1000000 });

        await Player.create({
            name: "TransferPlayer",
            position: "Midfielder",
            price: 500000,
            userId: seller._id,
            teamId: sellerTeam._id,
            forSale: true,
            askingPrice: 500000,
        });
    });

    it("shows available players for sale", async () => {
        const res = await request(app)
            .get("/api/v1/transfer")
            .set("Authorization", `Bearer ${buyerToken}`)
            .expect(200);

        expect(Array.isArray(res.body.players)).toBe(true);
        expect(res.body.players.length).toBeGreaterThan(0);
    });
});
