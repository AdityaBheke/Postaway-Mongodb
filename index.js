// Third party imports
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Internal imports
import userRouter from './src/features/user/user.router.js';
import postRouter from './src/features/post/post.router.js';
import commentRouter from './src/features/comment/comment.router.js';
import likeRouter from './src/features/like/like.router.js';
import friendRouter from './src/features/friend/friend.routes.js';
import otpRouter from './src/features/otp/otp.routes.js';
import { errorHandler } from './src/errorHandler/errorHandler.middleware.js';
import { loggerMiddleware } from './src/middlewares/logger.middleware.js';
import { connectUsingMongoose } from './src/config/mongodb.config.js';


// Setup
const server = express();
server.use(bodyParser.json());
server.use(cookieParser());

// Logger
server.use(loggerMiddleware);
//Custom Routes
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/comments', commentRouter);
server.use('/api/likes', likeRouter);
server.use('/api/friends', friendRouter);
server.use('/api/otp', otpRouter);


// Default Routes
server.get('/',(req,res)=>{
    res.send('Welcome to Postaway!');
})
server.use((req,res)=>{
    res.status(404).send('API not found.')
})
server.use(errorHandler);

// Listen
server.listen(3000,()=>{
    console.log('Server is listening on port 3000');
    connectUsingMongoose()
})