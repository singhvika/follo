console.log('loading routes')

let routes = require('express').Router();

console.log('loading authroutes');
const authRouthes = require (__dirname+'/authenticationRoutes/authenticationRoute.js');
const commRoutes = require(__dirname+'/communityRoutes/communityRoute.js')


// route for signup
routes.post('/signup/', authRouthes.uploadProfilePicture);
// route for login
routes.post('/login/', authRouthes.login);

// route for creating a community
routes.post('/createComm/',commRoutes.createCommunity);


module.exports = {
    routes
}