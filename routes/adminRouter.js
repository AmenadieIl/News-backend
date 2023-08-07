const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController.js');
const Admin = new adminController();


adminRouter
    .route('/admin/posts')
    .post(Admin.newPost)
    .get(Admin.getPosts);


adminRouter
    .route('/admin/posts/:id')
    .get(Admin.getPostsById)
    .patch(Admin.updatePostById)
    .delete(Admin.deletePostById);

module.exports = adminRouter;