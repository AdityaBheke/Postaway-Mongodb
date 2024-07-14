// Third party imports
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swagger from 'swagger-ui-express';

// Internal imports
import userRouter from './src/features/user/user.router.js';
import postRouter from './src/features/post/post.router.js';
import commentRouter from './src/features/comment/comment.router.js';
import likeRouter from './src/features/like/like.router.js';
import { errorHandler } from './src/errorHandler/errorHandler.middleware.js';
import { loggerMiddleware } from './src/middlewares/logger.middleware.js';
import swaggerJson from './public/docs/swagger.json' assert {type: 'json'};


// Setup
const server = express();
server.use(bodyParser.json());
server.use(cookieParser());

// Swagger docs
server.use('/api-docs', swagger.serve, swagger.setup(swaggerJson));
// Logger
server.use(loggerMiddleware);
//Custom Routes
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);
server.use('/api/comment', commentRouter);
server.use('/api/like', likeRouter);

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