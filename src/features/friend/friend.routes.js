import express from 'express';

import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import FriendController from './friend.controller.js';

const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.get('/get-friends/:userId', (req, res, next)=>{
    friendController.getFriendsByUserId(req, res, next);
});
friendRouter.get('/get-pending-requests', jwtAuth, (req, res, next)=>{
    friendController.getPendingRequests(req, res, next);
});
friendRouter.post('/toggle-friendship/:friendId', jwtAuth, (req, res, next)=>{
    friendController.toggleFriendship(req, res, next);
});
friendRouter.post('/response-to-request/:friendId', jwtAuth, (req, res, next)=>{
    friendController.respondToRequest(req, res, next);
});

export default friendRouter;