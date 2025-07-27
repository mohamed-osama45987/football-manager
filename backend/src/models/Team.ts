import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    teamName: { type: String, required: true },
    budget: { type: Number, default: 5000000 },
}, {
    timestamps: true,
    toJSON: {
        schemaFieldsOnly: true,
        versionKey: false,
    },
});

export const Team = mongoose.model('Team', teamSchema);
