
let authenticationController = require (__dirname+'/../../controllers/authenticationController/authenticationController.js')
let routes = require('express').Router();
const authChecker = require (__dirname+'/../../middleware/authChecker.js');
const imageUploadForUsers = require (__dirname+'/../../middleware/imageUploadForUsers.js')

routes.post('/user/signup/', imageUploadForUsers ,authenticationController.signup);

routes.post('/user/login/', authenticationController.login);

routes.post('/user/logout', authChecker, authenticationController.logout);

module.exports = routes;