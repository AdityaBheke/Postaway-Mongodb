export default class PostModel{
    constructor(userId, caption, imageUrl, id){
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this.id = id;
    }
    static createPost(userId, caption, imageUrl){
        const post = new PostModel(userId, caption, imageUrl);
        post.id = getUniqueId();
        posts.push(post);
        return post;
    }
    static getPostById(postId){
        const post = posts.find(p=>p.id==postId);
        return post;
    }
    static getPostsByUserId(userId){
        const post = posts.filter(p=>p.userId==userId);
        return post;
    }
    static getAllPosts(){
        return posts;
    }
    static updatePost(userId, caption, imageUrl, postId){
        const index = posts.findIndex(p=>p.id==postId && p.userId==userId);
        if(index == -1){
            return null;
        }
        posts[index].caption = caption;
        posts[index].imageUrl = imageUrl;
        return posts[index];
    }
    static deletePost(userId, postId){
        const index = posts.findIndex(p=>p.id==postId && p.userId==userId);
        if (index == -1) {
            return null;
        }
        return posts.splice(index,1);
    }
}

const posts = [
    new PostModel(1, 'Lorem Ipsum', 'sampleImage1.jpg',1),
    new PostModel(1, 'Caption 2', 'sampleImage2.jpg',2),
    new PostModel(2, 'Caption 3', 'sampleImage3.jpg',3),
    new PostModel(2, 'Caption 4', 'sampleImage4.jpg',4)
];

function getUniqueId() {
    const id = posts[posts.length-1].id + 1;
    return id;
}
