import express from 'express';
import OtpController from './otp.controller.js';
import { passwordValidator } from '../../middlewares/validation.middleware.js';

const otpRouter = express.Router();
const otpController = new OtpController();

otpRouter.post('/send',(req, res, next)=>{
    otpController.sendOtp(req, res, next);
});
otpRouter.post('/verify',(req, res, next)=>{
    otpController.verifyOtp(req, res, next);
});
otpRouter.post('/reset-password', passwordValidator, (req, res, next)=>{
    otpController.resetPassword(req, res, next);
});

export default otpRouter;