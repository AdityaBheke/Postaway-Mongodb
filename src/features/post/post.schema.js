import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: [true, 'Caption cannot be empty']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image cannot be empty']
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
})