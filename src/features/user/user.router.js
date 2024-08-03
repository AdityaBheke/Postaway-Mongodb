import express from 'express';

import UserController from './user.controller.js';
import { signUpValidator, signInValidator } from '../../middlewares/validation.middleware.js';
import fileUpload from './../../middlewares/fileUpload.middleware.js'
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', fileUpload.single('avatar'), signUpValidator, (req, res, next)=>{
    userController.signupUser(req, res, next);
});
userRouter.post('/signin', signInValidator, (req, res, next)=>{
    userController.signinUser(req, res, next);
});
userRouter.put('/update-details', jwtAuth, fileUpload.single('avatar'), (req, res, next)=>{
    userController.updateUser(req, res, next);
});
userRouter.get('/get-details/:userId', (req, res, next)=>{
    userController.getUserById(req, res, next);
})
userRouter.get('/get-all-details',(req, res, next)=>{
    userController.getAllUsers(req, res, next);
})
userRouter.post('/logout', jwtAuth, (req, res, next)=>{
    userController.logoutUser(req, res, next);
});

export default userRouter;