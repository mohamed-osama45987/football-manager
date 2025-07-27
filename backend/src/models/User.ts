import mongoose from "mongoose";

const userShcema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        schemaFieldsOnly: true,
        versionKey: false,
    },
})

export const User = mongoose.model('User', userShcema)