let commController = require(__dirname +
  "/../../controllers/communityController/communityController.js");
const authChecker = require(__dirname + "/../../middleware/authChecker.js");

const imageUploadForCommunity = require (__dirname+'/../../middleware/imageUploadForCommunity.js')

let routes = require("express").Router();

routes.post("/community/", authChecker, imageUploadForCommunity, commController.createCommunity);

routes.get("/community/", commController.getAllCommunities);

routes.get("/community/:name", commController.findCommunity);

routes.put("/community/follow/:name", authChecker, commController.joinCommunity);

routes.put("/community/delete/:name",commController.deleteCommunity);

routes.put("/community/unfollow/:name", authChecker, commController.unfollowCommunity);

module.exports = routes;
