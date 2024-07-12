import express from 'express';

import CommentController from './comment.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import { postIdValidator, commentContentValidator } from '../../middlewares/validation.middleware.js';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post('/:id', jwtAuth, commentContentValidator, commentController.addComment);
commentRouter.get('/:id', postIdValidator, commentController.getCommentsByPostId);
commentRouter.put('/:id', jwtAuth, commentContentValidator, commentController.updateComment);
commentRouter.delete('/:id', jwtAuth, postIdValidator, commentController.deleteComment);

export default commentRouter;