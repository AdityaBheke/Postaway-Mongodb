import mongoose from "mongoose";
import { LikeSchema } from "./like.schema.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";
import { PostSchema } from "../post/post.schema.js";

const likeModel = mongoose.model('Like', LikeSchema);
const postModel = mongoose.model('Post', PostSchema);

export default class LikeRepository{
    async toggleLike(postId, userId){
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                throw new customError(404, 'Post not found');
            }
            const existingLike = await likeModel.findOne({post: postId, user: userId});
            if (existingLike) {
                const removedLike = await likeModel.deleteOne({post: postId, user: userId}).populate('user', '_id name email');
                await postModel.findByIdAndUpdate(postId,{$pull: {likes: existingLike._id}})
                return {success: true, message: 'Post disliked', res: removedLike}
            }else{
                const like = new likeModel({post: postId, user: userId});
                const createdLike = await (await like.save()).populate('user');
                await postModel.findByIdAndUpdate(postId,{$push: {likes: createdLike._id}})
                return {success: true, message: 'Post liked', res: createdLike}
            }
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message);          
        }
    }
    async getLikesByPostId(postId){
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                throw new customError(404, 'Post not found');
            }
            const likes = await likeModel.find({post: postId}).populate('user', '_id name email');
            return {success: true, res: likes}
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message);
        }
    }
}