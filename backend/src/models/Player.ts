import mongoose from "mongoose";
const playerSchema = new mongoose.Schema({
    name: String,
    position: String,
    price: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    forSale: { type: Boolean, default: false },
    askingPrice: Number,
}, {
    timestamps: true,
    toJSON: {
        schemaFieldsOnly: true,
        versionKey: false,
    },
    id: true

});




export const Player = mongoose.model('Player', playerSchema);
