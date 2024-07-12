import express from 'express';

import LikeController from './like.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import { postIdValidator } from '../../middlewares/validation.middleware.js';

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get('/:id', postIdValidator, likeController.getLikesByPostId);
likeRouter.get('/toggle/:id', jwtAuth, postIdValidator, likeController.toggleLike);

export default likeRouter;
