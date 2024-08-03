import express from 'express';

import UserController from './user.controller.js';
import { signUpValidator, signInValidator } from '../../middlewares/validation.middleware.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', signUpValidator, userController.signupUser);
userRouter.post('/signin', signInValidator, userController.signinUser);
userRouter.post('/logout', userController.logoutUser);

export default userRouter;