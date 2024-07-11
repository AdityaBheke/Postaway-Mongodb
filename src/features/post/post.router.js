import express from 'express';

import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import PostController from './post.controller.js';
import fileUpload from '../../middlewares/fileUpload.middleware.js';

const postRouter = express.Router();
const postController = new PostController();

postRouter.post('/', jwtAuth, fileUpload.single('imageUrl'), postController.createPost);
postRouter.get('/', jwtAuth, postController.getPostsByUserId);
postRouter.get('/all', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.put('/:id', jwtAuth, fileUpload.single('imageUrl'), postController.updatePost);
postRouter.delete('/:id', jwtAuth, postController.deletePost);



export default postRouter;