import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: [true, 'Comment cannot be empty']
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post id is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required']
    }
})