import mongoose from "mongoose";
import { PostSchema } from "./post.schema.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";

const postModel = mongoose.model('Post', PostSchema);
export default class PostRepository{
    async createPost(postData){
        try {
            const post = new postModel(postData);
            const createdPost = await post.save();
            return {success: true, res: await post.populate({path: 'user',select: '_id name email'})};
        } catch (error) {
            throw new customError(400, error.message);
        }
    }
    async getPostById(postId){
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                throw new customError(404, 'Post not found');
            }
            return {success: true, res: await post.populate({path: 'user',select: '_id name email'})};
        } catch (error) {
            throw new customError(error.statusCode || 400, error.message || "Error while fetching post by postId");
        }
    }
    async getPostsByUserId(userId){
        try {
            const posts = await postModel.find({user: userId});
            const result = await Promise.all(posts.map(post=>post.populate({path: 'user',select: '_id name email'})));
            return {
                success: true, 
                res: result
            };
        } catch (error) {
            throw new customError(400, error.message || "Error while fetching posts by userId");
        }
    }
    async getAllPosts(){
        try {
            const posts = await postModel.find();
            const result = await Promise.all(posts.map(post=>post.populate({path: 'user',select: '_id name email'})));
            return {
                success: true, 
                res: result
            };
        } catch (error) {
            throw new customError(400, error.message || "Error while fetching all posts");
        }
    }
    async updatePost(userId, postId, updateData){
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                throw new customError(404, 'Post not found');
            }
            if (post.user != userId) {
                throw new customError(403, 'Only post owner can update post');
            }
            await postModel.findByIdAndUpdate(postId, updateData);
            const updatedPost = await postModel.findById(postId);
            return {success: true, res: await updatedPost.populate('user')}; 
        } catch (error) {
            throw new customError( error.statusCode || 400, error.message || "Error while updating post");
        }
    }
    async deletePost(userId, postId){
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                throw new customError(404, 'Post not found');
            }
            if (post.user != userId) {
                throw new customError(403, 'Only post owner can update post');
            }
            const deletedPost = await postModel.findByIdAndDelete(postId);
            return {success: true, res: await deletedPost.populate('user')}; 
        } catch (error) {
            throw new customError( error.statusCode || 400, error.message || "Error while deleting post");
        }
    }
}