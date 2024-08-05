import mongoose from "mongoose";

export const OtpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required']
    },
    otp: {
        type: Number,
        required: [true, 'OTP is required'],
        match: [/^\d{6}$/,'OTP should have only 6 digits']
    },
    verified: {
        type: Boolean,
        required: [true, 'OTP status is required']
    }
})