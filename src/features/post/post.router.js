import express from 'express';

import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import PostController from './post.controller.js';
import fileUpload from '../../middlewares/fileUpload.middleware.js';
import { createPostValidator, updatePostValidator, postIdValidator } from '../../middlewares/validation.middleware.js';

const postRouter = express.Router();
const postController = new PostController();

postRouter.post('/', jwtAuth, fileUpload.single('imageUrl'), createPostValidator, postController.createPost);
postRouter.get('/', jwtAuth, postController.getPostsByUserId);
postRouter.get('/all', jwtAuth,  postController.getAllPosts);
postRouter.get('/:id', jwtAuth,  postIdValidator, postController.getPostById);
postRouter.put('/:id', jwtAuth, fileUpload.single('imageUrl'), updatePostValidator, postController.updatePost);
postRouter.delete('/:id', jwtAuth, postIdValidator, postController.deletePost);



export default postRouter;