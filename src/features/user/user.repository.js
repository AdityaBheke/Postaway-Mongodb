import mongoose from "mongoose";
import { UserSchema } from "./user.schema.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";

const userModel = mongoose.model('User', UserSchema);
export default class UserRepository{
    async signup(userData){
        try {
          const user = new userModel(userData);
          const createdUser = await user.save();
          return { success: true, res: createdUser };
        } catch (error) {
          throw new customError(400, error.message);
        }
    }
    async findByEmail(email){
        try {
            const user = await userModel.findOne({email: email});
            if (user) {
                return { success: true, res: user };
            } else {
                throw new customError(404, "User not found");
            }
        } catch (error) {
            throw new customError(error.statusCode || 400, error.message || error.errorMessage);
        }
    }
    async getUserById(userId){
        try {
            const user = await userModel.findById(userId);
            if (user) {
                return { success: true, res: user };
            } else {
                throw new customError(404, "User not found");
            }
        } catch (error) {
            throw new customError(error.statusCode || 400, error.message || error.errorMessage);
        }
    }
    async getAllUsers(){
        try {
            const users = await userModel.find();
            return { success: true, res: users };
        } catch (error) {
            throw new customError(500, "Error while fetching all users");
        }
    }
    async updateUser(userId, updateData){
        try {
            const user = await userModel.findByIdAndUpdate(userId, updateData);
            const updatedUser = await userModel.findById(user._id);
            return { success: true, res: updatedUser };
        } catch (error) {
            throw new customError(400, error.message);
        }
    }
}