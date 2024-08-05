import FriendRepository from "./friend.repository.js";

export default class FriendController{
    constructor(){
        this.repository = new FriendRepository();
    }
    async getFriendsByUserId(req, res, next){
        const userId = req.params.userId;
        try {
            const result = await this.repository.getFriendsByUserId(userId);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    async getPendingRequests(req, res, next){
        const userId = req.userId;
        try {
            const result = await this.repository.getPendingRequests(userId);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    async toggleFriendship(req, res, next){
        const userId = req.userId;
        const friendId = req.params.friendId;
        try {
            const result = await this.repository.toggleFriendship(userId, friendId);
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
    async respondToRequest(req, res, next){
        const userId = req.userId;
        const friendId = req.params.friendId;
        const response = req.body.response;
        try {
            const result = await this.repository.respondToRequest(userId, friendId, response)
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
}