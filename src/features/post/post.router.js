import express from 'express';

import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import PostController from './post.controller.js';
import fileUpload from '../../middlewares/fileUpload.middleware.js';
import { createPostValidator, getPostByIdValidator, updatePostValidator, deletePostValidator } from '../../middlewares/validation.middleware.js';

const postRouter = express.Router();
const postController = new PostController();

postRouter.post('/', jwtAuth, fileUpload.single('imageUrl'), createPostValidator, postController.createPost);
postRouter.get('/', jwtAuth, postController.getPostsByUserId);
postRouter.get('/all', postController.getAllPosts);
postRouter.get('/:id', getPostByIdValidator, postController.getPostById);
postRouter.put('/:id', jwtAuth, fileUpload.single('imageUrl'), updatePostValidator, postController.updatePost);
postRouter.delete('/:id', jwtAuth, deletePostValidator, postController.deletePost);



export default postRouter;