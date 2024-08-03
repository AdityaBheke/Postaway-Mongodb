import express from 'express';

import CommentController from './comment.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import { postIdValidator, commentContentValidator } from '../../middlewares/validation.middleware.js';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post('/:id', jwtAuth, (req, res, next)=>{
    commentController.addComment(req, res, next);
});
commentRouter.get('/:id', (req, res, next)=>{
    commentController.getCommentsByPostId(req, res, next);
});
commentRouter.put('/:id', jwtAuth, (req, res, next)=>{
    commentController.updateComment(req, res, next);
});
commentRouter.delete('/:id', jwtAuth, (req, res, next)=>{
    commentController.deleteComment(req, res, next);
});

export default commentRouter;