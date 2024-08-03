import mongoose from "mongoose";
import { CommentSchema } from "./comment.schema.js";
import { PostSchema } from "../post/post.schema.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";

const commentModel = mongoose.model('Comment', CommentSchema);
const postModel = mongoose.model('Post', PostSchema);

export default class CommentRepository{
    async createComment(userId, postId, content){
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                throw new customError(404, 'Post not found');
            }
            const comment = new commentModel({content: content,post: postId,user: userId});
            const createdComment = await (await comment.save()).populate('user', '_id name email');
            await postModel.findByIdAndUpdate(createdComment.post, {$push: {comments: createdComment._id}});
            return {success: true, res: createdComment};
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || "Error while creating comment");
        }
    }

    async getCommentsByPostId(postId){
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                throw new customError(404, 'Post not found');
            }
            const comments = (await post.populate({path: 'comments', populate: {path: 'user', select: '_id name email', model:'User'}})).comments;
            return {success: true, res: comments};
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || "Error while fetching comment");
        }
    }
    async updateComment(userId, commentId, content){
        try {
            const comment = await commentModel.findById(commentId);
            if (!comment) {
                throw new customError(404, 'Comment not found');
            }
            if (comment.user != userId) {
                throw new customError(403, 'Only comment owner can update comment');
            }
            comment.content = content;
            const updatedComment = await (await comment.save()).populate('user', '_id name email');
            return {success: true, res: updatedComment};
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || "Error while updating comment");
        }
    }
    async deleteComment(userId, commentId){
        try {
            const comment = await commentModel.findById(commentId);
            if (!comment) {
                throw new customError(404, 'Comment not found');
            }
            if (comment.user != userId) {
                throw new customError(403, 'Only comment owner can update comment');
            }
            const deletedComment = await (await commentModel.findByIdAndDelete(commentId)).populate('user', '_id name email');
            await postModel.findByIdAndUpdate(deletedComment.post, {$pull: {comments: commentId}});
            return {success: true, res: deletedComment};
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || "Error while deleting comment");
        }
    }
}