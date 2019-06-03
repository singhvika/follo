let userService = require(__dirname +
    "/../../services/userService/userService.js");
    

  let getUser = async (req, res) => {
    console.log(req.body);
    let result = await userService.getUser(req.body.email);
    console.log(result);
    if (result) {
        res.send(result);
    }
    else {
        res.status(400).send({
            status: 400,
            message: 'cannot login'
        });
    }

}

let getPersonalPost = (req, res) => {
  let user = req.user;
  userService.getPersonalPost(user).then(result => {
    if (result.posts && result.posts.length > 0) {
      res.send({
        posts: result.posts
      })
    } else {
      res.send({
        message: "No Posts Found",
        getAllStatus: result.getAllStatus,
        posts: []
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error while Checking Comment Creator"
    });
  })
}

  module.exports = {
    getUser,
    getPersonalPost
  };
  