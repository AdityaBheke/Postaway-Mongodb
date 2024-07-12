import PostModel from "../post/post.model.js";
export default class LikeModel{
    constructor(userId, postId, id){
        this.userId = userId;
        this.postId = postId;
        this.id = id;
    }
    static getLikesByPostId(postId){
        const post = PostModel.getPostById(postId);
        if (!post) {
            return null;
        }
        const allLikes = likes.filter(l=>l.postId==postId);
        return allLikes;
    }
    static toggleLike(userId, postId){
        const post = PostModel.getPostById(postId);
        if (!post) {
            return null;
        }
        const likeIndex = likes.findIndex(like => like.userId==userId && like.postId==postId);
        if (likeIndex == -1) {
            const like = new LikeModel(userId, postId);
            like.id = getUniqueId();
            likes.push(like);
            return {like: like, status: 1};
        } else {
            return {like: likes.splice(likeIndex, 1), status: 0};
        }
    }
}

const likes = [
    new LikeModel(1, 1, 1),
    new LikeModel(1, 2, 2),
    new LikeModel(1, 3, 3),
    new LikeModel(1, 4, 4),
    new LikeModel(2, 1, 5),
    new LikeModel(2, 2, 6),
    new LikeModel(2, 3, 7)
]

function getUniqueId() {
    const id = likes[likes.length-1].id + 1;
    return id;
}