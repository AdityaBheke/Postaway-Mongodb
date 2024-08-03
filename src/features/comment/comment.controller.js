import CommentModel from "./comment.model.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";
import CommentRepository from "./comment.repository.js";

export default class CommentController{
    constructor(){
        this.repository = new CommentRepository();
    }
    async addComment(req, res, next){
        const userId = req.userId;
        const postId = req.params.id;
        const content = req.body.content;
        try {
            const result = await this.repository.createComment(userId, postId, content);
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
    async getCommentsByPostId(req, res, next){
        const postId = req.params.id; 
        try {
            const result = await this.repository.getCommentsByPostId(postId);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    async updateComment(req, res, next){
        const userId = req.userId;
        const commentId = req.params.id;
        const content = req.body.content;
        try {
            const result = await this.repository.updateComment(userId, commentId, content);
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
    async deleteComment(req, res, next){
        const userId = req.userId;
        const commentId = req.params.id;
        try {
            const result = await this.repository.deleteComment(userId, commentId);
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
}