import express from 'express';

import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import PostController from './post.controller.js';
import fileUpload from '../../middlewares/fileUpload.middleware.js';
import { createPostValidator, updatePostValidator, postIdValidator } from '../../middlewares/validation.middleware.js';

const postRouter = express.Router();
const postController = new PostController();

postRouter.post('/', jwtAuth, fileUpload.single('imageUrl'),(req, res, next)=>{
    postController.createPost(req, res, next);
});
postRouter.get('/user/:userId', (req, res, next)=>{
    postController.getPostsByUserId(req, res, next);
});
postRouter.get('/all', (req, res, next)=>{
    postController.getAllPosts(req, res, next);
});
postRouter.get('/:id', (req, res, next)=>{
    postController.getPostById(req, res, next);
});
postRouter.put('/:id', jwtAuth, fileUpload.single('imageUrl'), (req, res, next)=>{
    postController.updatePost(req, res, next);
});
postRouter.delete('/:id', jwtAuth, (req, res, next)=>{
    postController.deletePost(req, res, next);
});



export default postRouter;