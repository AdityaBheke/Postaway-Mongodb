# Postaway

Postaway is a backend social media application designed with essential APIs needed for user management, posts, comments, likes, friendships, and OTP-based authentication. Built using Node.js, Express, and MongoDB, it provides a solid foundation for creating a full-fledged social media platform.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

### 1. User
- **Sign Up** - Register a new user.
- **Sign In** - Authenticate a user and start a session.
- **Logout** - End a user's session.
- **Get User Details** - Retrieve information about a specific user.
- **Get All User Details** - Retrieve information about all users.
- **Update User Details** - Modify user information.

### 2. Posts
- **Get All Posts** - Retrieve all posts.
- **Get Post by ID** - Retrieve a single post by its ID.
- **Get User Posts** - Retrieve all posts created by a specific user.
- **Create Post** - Add a new post.
- **Delete Post** - Remove an existing post.
- **Update Post** - Modify the content of a post.

### 3. Comments
- **Get Comments** - Retrieve all comments on a post.
- **Add Comment** - Add a new comment to a post.
- **Delete Comment** - Remove a comment.
- **Update Comment** - Modify a comment.

### 4. Likes
- **Get Likes** - Retrieve the list of users who liked a post.
- **Toggle Post Like** - Like or unlike a post.

### 5. Friendship
- **Get Friends** - Retrieve a list of a user’s friends.
- **Get Pending Requests** - Retrieve pending friend requests.
- **Toggle Friendship** - Send or cancel a friend request.
- **Respond to Friend Request** - Accept or reject a friend request.

### 6. OTP
- **Send OTP** - Generate and send an OTP for password reset.
- **Verify OTP** - Authenticate the OTP for password reset.
- **Reset Password** - Reset a user's password after OTP verification.

## Technologies

- **Node.js** - JavaScript runtime environment.
- **Express.js** - Web application framework for Node.js.
- **MongoDB** - NoSQL database for data persistence.

## Usage
You can interact with the API through an API client **Postman**.

### Postman Collection

You can use the [Postaway Postman Collection](<https://www.postman.com/maintenance-pilot-10781088/workspace/my-public-workspace/collection/21923336-f9f83746-9e40-4a1c-8fb4-edd6352ea2a5?action=share&creator=21923336>) to easily test the API endpoints. Import the collection into Postman to view and test each endpoint with sample requests.


## API Endpoints

### User
- **POST /api/users/signup** - Register a new user.
- **POST /api/users/signin** - Authenticate a user.
- **POST /api/users/logout** - End a user session.
- **GET /api/users/** - Retrieve user details.
- **GET /api/users/get-all-details** - Retrieve all user details.
- **PUT /api/users/update-details** - Update user details.

### Posts
- **GET /api/posts/all** - Get all posts.
- **GET /api/posts/:id** - Get a specific post by ID.
- **GET /api/posts/user/:userId** - Get posts created by a specific user.
- **POST /api/posts** - Create a new post.
- **DELETE /api/posts/:id** - Delete a post.
- **PUT /api/posts/:id** - Update a post.

### Comments
- **GET /api/comments/:postId** - Get comments on a post.
- **POST /api/comments/:postId** - Add a new comment.
- **DELETE /api/comments/:commentId** - Delete a comment.
- **PUT /api/comments/:commentId** - Update a comment.

### Likes
- **GET /api/likes/:postId** - Get likes on a post.
- **POST /api/likes/toggle/:postId** - Toggle like on a post.

### Friendship
- **GET /api/friends/get-friends/:userId** - Retrieve user’s friends.
- **GET /api/friends/get-pending-requests** - Retrieve pending friend requests.
- **POST /api/friends/toggle-friendship/:friendId** - Send or cancel a friend request.
- **PUT /api/friends/response-to-request/:friendId** - Accept or reject a friend request.

### OTP
- **POST /api/otp/send** - Send OTP to a user.
- **POST /api/otp/verify** - Verify OTP.
- **POST /api/otp/reset-password** - Reset password after OTP verification.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaBheke/Postaway-Mongodb.git
2. Navigate to the project directory:
    ```bash
    cd postaway
3. Install dependencies:
    ```bash
    npm install
4. Start the server:
    ```bash
    node index.js
