import LikeModel from "./like.model.js";
import { customError } from "../../errorHandler/errorHandler.middleware.js";

export default class LikeController{
    getLikesByPostId(req, res){
        const postId = req.params.id;
        const likes = LikeModel.getLikesByPostId(postId);
        if (likes) {
            res.status(200).send({status:true, message: `Likes for post with id ${postId} fetched`, total: likes.length, likes: likes});
        } else {
            throw new customError(404, `Post with id ${postId} not found`);
        }
    }
    toggleLike(req, res){
        const userId = req.userId;
        const postId = req.params.id;
        const like = LikeModel.toggleLike(userId, postId);
        if (!like) {
            throw new customError(404, `Post with id ${postId} not found`);
        } else if(like.status==1) {
            res.status(201).send({status:true, message: `Like added for post with id ${postId}`, like: like.like});
        }else{
            res.status(201).send({status:true, message: `Like removed for post with id ${postId}`, like: like.like[0]});
        }
    }
}