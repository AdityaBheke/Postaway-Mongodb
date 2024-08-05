import mongoose from "mongoose";
import { FriendSchema } from "./friend.schema.js";
import { UserSchema } from "../user/user.schema.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";

const friendModel = mongoose.model('Friend', FriendSchema);
const userModel = mongoose.model('User', UserSchema);

export default class FriendRepository{
    async getFriendsByUserId(userId){
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new customError(404, 'User not found');
            }
            const friends = await friendModel.find({$or: [{sender: userId}, {receiver: userId}], status: true});
            const result = await Promise.all(friends.map(friend=>friend.populate('sender receiver', '_id name email')));
            return {success: true, message: `All friends of user id ${userId}`, res: result};
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || 'Error while fetching friends of user')
        }
    }
    async getPendingRequests(userId){
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new customError(404, 'User not found');
            }
            const friends = await friendModel.find({receiver: userId, status: false});
            const result = await Promise.all(friends.map(friend=>friend.populate('sender receiver', '_id name email')));
            return {success: true, message: `All pending requests of user id ${userId}`, res: result};
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || 'Error while fetching friends of user')
        }
    }
    async toggleFriendship(userId, friendId){
        // If two users are already friends then unfriend them, 
        // If req is sent from current user(userId) but not accepted then revoke it,
        // If req is not sent then send request from current user(userId)
        try {
          const receiverFriend = await userModel.findById(friendId);
          if (!receiverFriend) {
            throw new customError(404, "Receiver not found");
          }
          const previousRequestFromReceiver = await friendModel.findOne({sender: friendId, receiver: userId });
          const previousRequestFromUser = await friendModel.findOne({sender: userId, receiver: friendId});
          
          if ( userId == friendId) {
            throw new customError(400, "You cannot send request to yourself");
          }
          // Check if current user have already pending request from other user
          if (previousRequestFromReceiver && !previousRequestFromReceiver?.status) {
            throw new customError(400, "You already have a pending request from this user");
          }
          //Check if both users are already friends
          if (previousRequestFromReceiver?.status || previousRequestFromUser?.status) {
            // unfriend them
            await friendModel.deleteOne({_id: previousRequestFromReceiver._id});
            return {success: true, message: `You are unfriended with your friend ${friendId}`};
          }
          // check if current user already has a pending request for same friend
          if (previousRequestFromUser && !previousRequestFromUser?.status) {
            // revoke request
            await friendModel.deleteOne({ _id: previousRequestFromUser._id });
            return {success: true, message: `Request revoked for user ${friendId}`};
          }
          // If all above condintions not satisfied which means both user has no pending request or they are not friends
          const newRequest = new friendModel({ sender: userId, receiver: friendId, status: false });
          const createdRequest = await ( await newRequest.save() ).populate("sender receiver", "_id name email");
          return { success: true, message: `Request sent to user ${friendId}`, res: createdRequest};
        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || 'Error while toggling friendship')
        }
    }
    async respondToRequest(userId, friendId, response){
        try {
            const receiverFriend = await userModel.findById(friendId);
            if (!receiverFriend) {
                throw new customError(404, "Receiver not found");
            }
            const friendRequest = await friendModel.findOne({sender: friendId, receiver: userId, status: false});
            if (!friendRequest) {
                throw new customError(404, 'Friend request not found');
            }
            if (response) {
                friendRequest.status = response;
                await friendRequest.save();
                return { success: true, message: `Request accepted `, res: await friendRequest.populate("sender receiver", "_id name email")};
            } else {
                await friendModel.deleteOne({_id: friendRequest._id});
                return { success: true, message: `Request rejected `, res: await friendRequest.populate("sender receiver", "_id name email")};
            }

        } catch (error) {
            throw new customError(error.statusCode || 400, error.errorMessage || error.message || 'Error while responding to request')
        }
    }
}