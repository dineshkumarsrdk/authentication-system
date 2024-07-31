import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // do not use Date.now()
        expires: 60 * 2, // The document will be automatically deleted after 5 minutes of its creation time
    }
});

export const verificationCodeModel = mongoose.model('otp', codeSchema);