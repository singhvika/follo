let postService = require(__dirname +
  "/../../services/postService/postService.js");

let createPost = async (req, res) => {
  let postJSON = req.body;
  console.log(req.files);
  let ufile = null;
  if (req.file) {
    console.log("11111111111111111111111");
    ufile = req.file;
  }
  if (req.files) {
    console.log("122222222222222211");
    ufile = req.files;
  }
  console.log(ufile);
  let result = await postService.createPost(postJSON,req.params.community,req.user,ufile);
  //console.log("res of create post"+result);
  if (result) {
    res.send(result);
  } else {
    res.status(400).send({
      status: 400,
      message: "cannot create post"
    });
  }
};

let updatePost = async (req, res) => {
  console.log(req.body + req.params.id);
  let postJSON = req.body;
  let result = await postService.updatePost(req.params.id, postJSON);
  console.log(result);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({
      status: 404,
      message: 'cannot update post'
    });
  }
}


let getAllPostOfUser = async (req, res) => {
  let result = await postService.getAllPostsByUser(req.user);
  console.log(result);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({
      status: 404,
      message: 'cannot get posts'
    });
  }
}


let getAllPostOfComm = async (req, res) => {
  let result = {};
  if (req.query.key) {
    result = await postService.searchPosts(req.query.key);
  } else {
    result = await postService.getAllPostsByCommunity(req.params.community);
  }
  console.log(result);
  if (result.length != 0) {
    res.status(200).send(result);
  } else {
    res.status(404).send({
      status: 404,
      message: "cannot get posts"
    });
  }
};


let getSinglePost = async (req, res) => {
  console.log(req.params.id);
  let result = await postService.getPostById(req.params.id);
  console.log(result);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({
      status: 404,
      message: 'cannot get post'
    });
  }
}

  let upvotePost = async (req, res) => {
    console.log("--"+req.params.id);
    let result = await postService.upvotePost(req.params.id,req.user);
    console.log(result);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send({
            status: 404,
            message: 'cannot get post'
        });
    }
  }


let searchPost = async (req, res) => {
  console.log(req.query.key);
  let result = await postService.searchPosts(req.query.key);
  console.log(result);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({
      status: 404,
      message: "cannot get post"
    });
  }
};

let createComment = async (req, res) => {
  let commentJSON = req.body;
  let result = await postService.createCommentForPost(
    commentJSON,
    req.params.post,
    req.user
  );
  if (result) {
    res.send(result);
  } else {
    res.status(400).send({
      status: 400,
      message: "cannot create comment"
    });
  }
};

let checkCreator = (req, res, next) => {
  postService
    .checkCreator(req.params.post, req.user)
    .then(result => {
      if (result.follower) {
        next();
      } else {
        res.status(400).send({
          message: "Creator mismatch"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

let downvotePost = async (req, res) => {
  console.log("--" + req.params.id);
  let result = await postService.downvotePost(req.params.id, req.user);
  console.log(result);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({
      status: 404,
      message: 'cannot get post'
    });
  }
}

let deleteComment = (req, res) => {
  postService
    .deleteComment(req.params.post, req.params.comment)
    .then(result => {
      if (result) {
        res.send({
          message: " Comment deleted Successfully",
          deleteStatus: result.deleteStatus,
          post: result.post
        });
      } else {
        res.status(400).send({
          message: " Error while deleting",
          deleteStatus: result.deleteStatus
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while Deleting Comment"
      });
    });
};

let checkFollower = (req, res, next) => {
  let user = req.user;
  let communityName = req.params.community;

  postService
    .checkFollower(user, communityName)
    .then(result => {
      if (result.followerStatus) {
        next();
      } else {
        res.status(400).send({
          followerStatus: false,
          message: "Please Follow Community"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while Checking Follower"
      })
    });
};

let checkCommentCreator = (req, res, next) => {
  let user = req.user;
  let postId = req.params.post;

  postService.checkCommentCreator(postId, user).then(result => {
    console.log(result.commentCreator);
    if (result.commentCreator) {
      next();
    } else {
      res.status(400).send({
        commentCreator: false,
        message: "You are not the creator"
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error while Checking Comment Creator"
    });
  });
}

let getPostsForDiscover = (req, res) => {
  let pageNo = req.params.pageNo;
  postService.getPostsForDiscover(pageNo).then(result => {
    if (result.posts && result.posts.length > 0) {
      res.send({
        posts: result.posts
      })
    } else {
      res.send({
        message: "No Posts Found",
        getAllStatus: result.getAllStatus
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error while Checking Comment Creator"
    });
  })
}


module.exports = {
  createPost,
  updatePost,
  getAllPostOfUser,
  getAllPostOfComm,
  getSinglePost,
  searchPost,
  createComment,
  checkFollower,
  //updateComment,
  checkCreator,
  deleteComment,
  //getAllPostComments
  upvotePost,
  downvotePost,
  checkCommentCreator,
  getPostsForDiscover
};