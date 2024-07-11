import { customError } from "../../errorHandler/errorHandler.middleware.js";
import PostModel from "./post.model.js";

export default class PostController{
    createPost(req, res){
        const userId = req.userId;
        const caption = req.body.caption;
        const imageUrl = req.file.filename;
        const post = PostModel.createPost(userId, caption, imageUrl);
        if (post) {
            res.status(201).send({status:true, message: 'Post created', post: post})
        } else {
            throw new customError(400, 'Unable to create Post');
        }
    }
    getPostById(req, res){
        const postId = req.params.id;
        const post = PostModel.getPostById(postId);
        if (post) {
            res.status(200).send({status:true, message: `Post with id ${postId} fetched`, post: post});
        } else {
            throw new customError(404, `Post with id ${postId} not found`);
        }
    }
    getPostsByUserId(req, res){
        const userId = req.userId;
        const posts = PostModel.getPostsByUserId(userId);
        res.status(200).send({status:true, message: `Posts of UserId ${userId} fetched`, posts: posts});
    }
    getAllPosts(req,res){
        const posts = PostModel.getAllPosts();
        res.status(200).send({status:true, message: `All posts fetched`, posts: posts});
    }
    updatePost(req, res){
        const userId = req.userId;
        const caption = req.body.caption;
        const imageUrl = req.file.filename;
        const postId = req.params.id;
        const post = PostModel.updatePost(userId, caption, imageUrl, postId);
        if (post) {
            res.status(201).send({status:true, message: `Post with id ${postId} updated`, post: post});
        } else {
            throw new customError(404, 'Post not found');
        }
    }
    deletePost(req, res){
        const userId = req.userId;
        const postId = req.params.id;
        const post = PostModel.deletePost(userId, postId);
        if (post) {
            res.status(201).send({status:true, message: `Post with id ${postId} deleted`, post: post});
        } else {
            throw new customError(404, 'Post not found');
        }
    }
}