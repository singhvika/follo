
let userController = require (__dirname+'/../../controllers/userController/userController.js')
let postController = require (__dirname+'/../../controllers/postController/postController.js')
let routes = require('express').Router();
const authChecker = require (__dirname+'/../../middleware/authChecker.js');

routes.post('/user/me', authChecker, userController.getUser);

routes.get('/user/post', authChecker, postController.getAllPostOfUser);

routes.get('/user/personal', authChecker, userController.getPersonalPost);

routes.get('/user/post/discover/:pageNo', postController.getPostsForDiscover);

module.exports = routes;