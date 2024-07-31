import mongoose from "mongoose";

const userLocalSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    }
});

export const userLocalModel = mongoose.model('userLocal', userLocalSchema);