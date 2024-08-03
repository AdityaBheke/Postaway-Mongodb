import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { customError } from "../../errorHandler/errorHandler.middleware.js";
import UserModel from "./user.model.js";
import UserRepository from './user.repository.js';
export default class UserController{
    constructor(){
        this.repository = new UserRepository();
    }
    async signupUser(req, res, next){
        const userData = req.body;
        const avatar = req.file?.filename ;
        if (avatar) {
            userData.avatar = avatar;
        }
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 12);
            userData.password = hashedPassword;
            const result = await this.repository.signup(userData)
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
    async signinUser(req, res, next){
        const {email, password} = req.body;
        try {
          const result = await this.repository.findByEmail(email);
          const checkPassword = await bcrypt.compare( password, result.res.password);
          if (checkPassword) {
            const token = jwt.sign({ userId: result.res._id, user: result.user }, "EpGbiLNDm5", { expiresIn: "1h" });
            res.cookie("jwtToken", token);
            result.token = token;
            return res.status(200).send(result);
          } else {
            throw new customError(401, "Invalid credentials");
          }
        } catch (error) {
          next(error);
        }
    }
    async getUserById(req, res, next){
        const {userId} = req.params;
        try {
            const result = await this.repository.getUserById(userId);
            return res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    async getAllUsers(req, res, next){
        try {
            const result = await this.repository.getAllUsers();
            return res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next){
        const userId = req.userId;
        const {name, gender} = req.body;
        const avatar = req.file?.filename ;
        const updateData = {name, gender, avatar};
        console.log(updateData);
        try {
            const result = await this.repository.updateUser(userId, updateData);
            return res.status(201).send(result);
        } catch (error) {
            next(error)
        }
    }

    logoutUser(req, res){
        res.cookie('jwtToken', '');
        res.status(200).send("User logged out successfully");
    }
}