import bcrypt from 'bcrypt';
import OtpRepository from "./otp.repository.js";

export default class OtpController{
    constructor(){
        this.repository = new OtpRepository();
    }
    async sendOtp(req, res, next){
        const userEmail = req.body.email;
        try {
            const result = await this.repository.sendOtp(userEmail);
            if (result) {
                res.cookie('user', result.res);
                return res.status(201).send({success: result.success, message: result.message});
            }
        } catch (error) {
            next(error);
        }
    }
    async verifyOtp(req, res, next){
        const otp = req.body.otp;
        const userId = req.cookies['user'];
        try {
            const result = await this.repository.verifyOtp(userId, otp);
            return res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next){
        const userId = req.cookies['user'];
        const password = req.body.newPassword;
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await this.repository.resetPassword(userId, hashedPassword);
            res.clearCookie('user');
            return res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
}