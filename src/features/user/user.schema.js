import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        minLength: [2, 'Name should contain atleast 2 characters']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    avatar: {
        type: String
    }
})