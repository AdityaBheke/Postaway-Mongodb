import { customError } from "../../errorHandler/errorHandler.middleware.js";
import PostModel from "./post.model.js";
import PostRepository from "./post.repository.js";

export default class PostController{
    constructor(){
        this.repository = new PostRepository();
    }
    async createPost(req, res, next){
        const userId = req.userId;
        const caption = req.body.caption;
        const imageUrl = req.file?.filename;
        const postData = {
            caption: caption,
            imageUrl: imageUrl,
            user: userId
        }
        try {
            const result = await this.repository.createPost(postData);
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
    async getPostById(req, res, next){
        const postId = req.params.id;
        try {
            const result = await this.repository.getPostById(postId);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    async getPostsByUserId(req, res, next){
        const userId = req.params.userId;
        try {
            const result = await this.repository.getPostsByUserId(userId);
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    async getAllPosts(req, res, next){
        try {
            const result = await this.repository.getAllPosts();
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    async updatePost(req, res, next){
        const userId = req.userId;
        const caption = req.body.caption;
        const imageUrl = req.file?.filename;
        const postId = req.params.id;
        const updateData = {caption, imageUrl};
        try {
            const result = await this.repository.updatePost(userId, postId, updateData);
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
    async deletePost(req, res, next){
        const userId = req.userId;
        const postId = req.params.id;
        try {
            const result = await this.repository.deletePost(userId, postId);
            res.status(201).send(result);
        } catch (error) {
            next(error)
        }
    }
}