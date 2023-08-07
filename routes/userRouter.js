const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController.js');
const User = new userController();


userRouter
    .route('/posts')
    .get(User.getNews);

userRouter
    .route('/posts/:title')
    .get(User.getNewsByTitle);

module.exports = userRouter;