const User = require(__dirname + "/../../models/userModel/userModel.js");
let authenticationService = require(__dirname +
  "/../../services/authenticationService/authenticationService.js");

let Post = require(__dirname + "/../../models/post/postModel.js");

// searches for a user with credentials, adds a new jwt token, and returns the user
let getUser = async (email, token) => {
  try {
    if (!email) {
      email = await authenticationService.jwtDecode(token);
    }
    let user = await User.findByEmail(email);
    console.log("uu:" + user);
    return user;
  } catch (e) {
    console.log("aa:" + e);
    return null;

  }
}

// let getUserByToken = async (tkn) => {
//   try {
//     let email= await authChecker.jwtDecode();

//     let user = await getUser;
//     return user;
//   }
//   catch (e) {
//     console.log("jwtderr"+e);
//     return null;

//   }
// }

  let getPersonalPost = (user) => {
    //let communityNames = user.followingCommunities.community;
    let communityNames = [];
  
    user.followingCommunities.forEach(element => {
      communityNames.push(element.community.name);
  
    })
  
    console.log(communityNames);
  
    return new Promise((resolve, reject) => {
      Post.find({
        "parent_community.cname": {
          $in: communityNames
        }
      }).exec().then(doc => {
        if (doc && doc.length > 0) {
          resolve({
            getAllStatus: true,
            posts: doc
          })
        } else {
          resolve({
            getAllStatus: false
          })
        }
      }).catch((err) => {
        console.log("cannot update post");
        console.log(err);
        reject(null);
      })
    })
  
  }

  module.exports = {
    getUser,
    getPersonalPost
  };

