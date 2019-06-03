let commService = require(__dirname +
  "/../../services/communityService/communityService.js");
/**
 * Method to create community by a user
 *
 * @param {*} req - details that are required to create community ie cname, description
 * @param {*} res - object of community that was created
 */
let createCommunity = (req, res) => {
  let newCommunity = req.body;
  if (req.file) {
    newCommunity.communityPicture = req.file.location;
  }
  commService.createCommunity(newCommunity, req.user)
    .then((result) => {
      if (result) {
        let community = {
          cname: result.community.cname,
          description: result.community.description,
          memberIds: result.community.memberIds,
          createdBy: result.community.createdBy,
          createdDate: result.community.createdDate
        }
        res.send(community);
      } else {
        res.status(400).send({
          status: 400,
          message: 'Cannot create Community'
        })
      }
    })
    .catch((result) => {
      res.status(400);
      res.send({
        message: "Cannot create Community",
        status: 400
      });

    })
}


/**
 *
 * Getting list of al communities that are present
 * @param {*} req
 * @param {*} res
 */
let getAllCommunities = async (req, res) => {
  let result = {};

  if (req.query.key) {
    result = await commService.searchCommunityByKey(req.query.key);
  } else {
    result = await commService.getAllCommunities(req.params.community);
  }  

  console.log(result);
    if (result.length != 0) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send({
            status: 404,
            message: 'cannot get communities'
        });
    }
};

/**
 * List Community by name.
 *
 * @param {*} req
 * @param {*} res
 */
let findCommunity = (req, res) => {
  commService.findCommunity(req.params.name).then(community => {
    if (community) {
      return res.status(200).send(community);
    } else {
      return res.status(404).send({
        message: req.params.name + " Community not found"
      });
    }
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Community."
    });
  });
}

let joinCommunity = (req, res) => {
  console.log(req.params.name);
  commService.joinCommunity(req.params.name, req.user).then((result) => {
    if (result) {
      res.send({
        message: " Community joined Successfully",
        joinStatus: result.joinStatus,
        community: result.community
      })
    } else {
      res.send({
        message: " Community joined failed",
        joinStatus: result.joinStatus
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Error while Joining Community"
    });
  });
}

let deleteCommunity = (req, res) => {
  commService.deleteCommunity(req.params.name).then((result) => {
    if (result) {
      res.send({
        message: " Community deleted successfully",
        deleteStatus: result.deleteStatus
      })
    } else {
      res.send({
        message: " Community Deletion Failed",
        deleteStatus: result.deleteStatus
      })
    }

  })
}

let unfollowCommunity = (req, res) => {
  commService.unfollowCommunity(req.params.name, req.user).then((result) => {
    if (result) {
      res.send({
        message: " Community unfollowed successfully",
        unfollowStatus: result.unfollowStatus
      })
    } else {
      res.status(400).send({
        message: " Community unfollowed Failed",
        unfollowStatus: result.unfollowStatus
      })
    }
  })
}

module.exports = {
  createCommunity,
  getAllCommunities,
  findCommunity,
  joinCommunity,
  deleteCommunity,
  unfollowCommunity
};