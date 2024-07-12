import CommentModel from "./comment.model.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";

export default class CommentController{
    addComment(req, res){
        const userId = req.userId;
        const postId = req.params.id;
        const content = req.body.content;
        const comment = CommentModel.createComment(userId, postId, content);
        if (comment) {
            res.status(201).send({status:true, message: `Comment added to Post with id ${postId}`, comment: comment});
        } else {
            throw new customError(404, `Post with id ${postId} not found`);
        }
    }
    getCommentsByPostId(req, res){
        const postId = req.params.id; 
        const allComments = CommentModel.getCommentsByPostId(postId);
        if (allComments) {
            res.status(200).send({status:true, message: `All comments fetched for Post with id ${postId}`, comments: allComments});
        } else {
            throw new customError(404, `Post with id ${postId} not found`);
        }
    }
    updateComment(req, res){
        const userId = req.userId;
        const commentId = req.params.id;
        const content = req.body.content;
        const comment = CommentModel.updateComment(userId, commentId, content);
        if (comment) {
            res.status(201).send({status:true, message: `Comment with id ${comment.id} updated for Post with id ${comment.postId}`, comment: comment});
        } else {
            throw new customError(400, `You cannot update other user's comment`);
        }
    }
    deleteComment(req,res){
        const userId = req.userId;
        const commentId = req.params.id;
        const comment = CommentModel.deleteComment(userId, commentId);
        if (comment) {
            res.status(201).send({status:true, message: `Comment with id ${commentId} deleted for Post with id ${comment.postId}`, comment: comment});
        } else {
            throw new customError(400, `You cannot delete other user's comment`);
        }
    }
}