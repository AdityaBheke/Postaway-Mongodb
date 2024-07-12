import PostModel from "../post/post.model.js";

export default class CommentModel{
    constructor(userId, postId, content, id){
        this.userId = userId;
        this.postId = postId;
        this.content = content;
        this.id = id;
    }
    static createComment(userId, postId, content){
        if (!PostModel.getPostById(postId)) {
            return null;
        }
        const comment = new CommentModel(userId, postId, content);
        comment.id = getUniqueId();
        comments.push(comment);
        return comment;
    }
    static getCommentsByPostId(postId){
        if (!PostModel.getPostById(postId)) {
            return null;
        }
        const allComments = comments.filter(c=>c.postId==postId);
        return allComments;
    }
    static updateComment(userId, commentId, content){
        const index = comments.findIndex(c=>c.userId==userId&&c.id==commentId);
        if (index == -1) {
            return null;
        }
        comments[index].content = content;
        return comments[index];
    }
    static deleteComment(userId, commentId){
        const index = comments.findIndex(c=>c.userId==userId&&c.id==commentId);
        if (index == -1) {
            return null;
        }
        return comments.splice(index, 1);
    }
}

const comments = [
    new CommentModel(1, 1, 'Comment1 for post 1', 1),
    new CommentModel(1, 1, 'Comment2 for post 1', 2),
    new CommentModel(1, 2, 'Comment1 for post 2', 3),
    new CommentModel(1, 2, 'Comment2 for post 2', 4),
    new CommentModel(2, 3, 'Comment1 for post 3', 5),
    new CommentModel(2, 3, 'Comment2 for post 3', 6),
    new CommentModel(2, 4, 'Comment1 for post 4', 7),
];

function getUniqueId() {
    const id = comments[comments.length-1].id + 1;
    return id;
}