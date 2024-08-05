import LikeModel from "./like.model.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";
import LikeRepository from "./like.repository.js";

export default class LikeController{
    constructor(){
        this.repository = new LikeRepository();
    }
    async getLikesByPostId(req, res, next){
        const postId = req.params.id;
        try {
            const result = await this.repository.getLikesByPostId(postId);
            res.status(200).send(result);
        } catch (error) {
            next(error)
        }
    }
    async toggleLike(req, res, next){
        const userId = req.userId;
        const postId = req.params.id;
        try {
            const result = await this.repository.toggleLike(postId, userId);
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
}