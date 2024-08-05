import express from 'express';

import LikeController from './like.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import { postIdValidator } from '../../middlewares/validation.middleware.js';

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get('/:id', (req, res, next)=>{
    likeController.getLikesByPostId(req, res, next);
});
likeRouter.post('/toggle/:id', jwtAuth, (req, res, next)=>{
    likeController.toggleLike(req, res, next);
});

export default likeRouter;
