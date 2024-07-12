// Third party imports
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Internal imports
import userRouter from './src/features/user/user.router.js';
import postRouter from './src/features/post/post.router.js';
import commentRouter from './src/features/comment/comment.router.js';
import { errorHandler } from './src/errorHandler/errorHandler.middleware.js';


// Setup
const server = express();
server.use(bodyParser.json());
server.use(cookieParser());

//Custom Routes
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);
server.use('/api/comment', commentRouter);

// Default Routes
server.get('/',(req,res)=>{
    res.send('Welcome to Postaway!');
})
server.use((req,res)=>{
    res.status(404).send('API not found.')
})
server.use(errorHandler);

// Listen
server.listen(3100,()=>{
    console.log('Server is listening on port 3100');
})