import mongoose from "mongoose";

import sendEmail from "../../config/email.config.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";
import { UserSchema } from "../user/user.schema.js";
import { OtpSchema } from "./otp.schema.js";

const otpModel = mongoose.model('Otp', OtpSchema);
const userModel = mongoose.model('User', UserSchema); 

export default class OtpRepository{
    async sendOtp(userEmail){
        try {
            const user = await userModel.findOne({email: userEmail})
            if (!user) {
                throw new customError(404, 'User not found');
            }
            //Generate random OTP
            const otpNumber = Math.floor(100000 +(Math.random() * 900000));
            console.log(otpNumber);
            
            // Check if user has sent otp before
            const previousOtp = await otpModel.findOne({user: user._id});
            if (previousOtp) {
                // Update otp with new number
                previousOtp.otp = otpNumber;
                previousOtp.verified = false;
                await previousOtp.save();
            } else {
                const otp = new otpModel({user: user._id, otp: otpNumber, verified: false});
                await otp.save();
            }
            const result = await sendEmail(user.email, otpNumber);
            return { success: true, message: `OTP sent to your registered email address: ${user.email}`, res: user._id};
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || 'Error while sending OTP to user');
        }
    }
    async verifyOtp(userId, otp){
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new customError(404, 'User not found');
            }
            const checkOtp = await otpModel.findOne({user: userId, otp: otp});
            if (checkOtp) {
                checkOtp.verified = true;
                await checkOtp.save();
                return { success: true, message: 'OTP verified! Now you can reset your password'};
            } else {
                throw new customError(400, 'Invalid OTP. Try again.');
            }
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || 'Error while sending OTP to user');
        }
    }
    async resetPassword(userId, password){
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new customError(404, 'User not found');
            }
            const checkVerification = await otpModel.findOne({user: userId, verified: true});
            if (checkVerification) {
                user.password = password;
                await user.save();
                await otpModel.deleteOne({user: userId, verified: true});
                return { success: true, message: 'Password changed successfully!'};
            } else {
                throw new customError(400, 'OTP not verified');
            }
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || 'Error while sending OTP to user');
        }
    }
}