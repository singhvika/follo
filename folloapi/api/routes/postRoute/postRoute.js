
let postController = require (__dirname+'/../../controllers/postController/postController.js')
let routes = require('express').Router();
const authChecker = require (__dirname+'/../../middleware/authChecker.js');
const imageUploadForPost = require (__dirname+'/../../middleware/imageUploadForPost.js');
const imageUploadForUsers = require (__dirname+'/../../middleware/imageUploadForUsers.js')


routes.post('/:community/post', authChecker,imageUploadForPost, postController.createPost);

routes.put('/:community/post/:id', authChecker,imageUploadForPost, postController.updatePost);

routes.get('/:community/post', postController.getAllPostOfComm);

routes.get('/post/search', postController.searchPost);

routes.get('/:community/post/:id', postController.getSinglePost);

routes.get('/:community/post/:id/upvote', authChecker, postController.upvotePost);

routes.get('/:community/post/:id/downvote', authChecker, postController.downvotePost);

routes.post('/:community/:post/comment',authChecker, postController.checkFollower, postController.createComment);

//routes.put('/:commentId',authChecker, postController.updateComment);

routes.put('/:post/delete/:comment',authChecker, postController.checkCommentCreator, postController.deleteComment);

//routes.get('/:post/comment',authChecker, postController.getAllPostComments);

routes.get('/post/discover/:pageNo', postController.getPostsForDiscover);

module.exports = routes;