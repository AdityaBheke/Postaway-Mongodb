import express from 'express';

import CommentController from './comment.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import { addCommentValidator, getCommentValidator, updateCommentValidator, deleteCommentValidator } from '../../middlewares/validation.middleware.js';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post('/:id', jwtAuth, addCommentValidator, commentController.addComment);
commentRouter.get('/:id', getCommentValidator, commentController.getCommentsByPostId);
commentRouter.put('/:id', jwtAuth, updateCommentValidator, commentController.updateComment);
commentRouter.delete('/:id', jwtAuth, deleteCommentValidator, commentController.deleteComment);

export default commentRouter;