let User = require(__dirname + '/../../models/userModel/userModel.js');

let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../../../config/config.js');
const jwtkey = config.JWT_KEY;



// let hashPassword = (pwd) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.hash(pwd, 10, (err, hash) => {
//       if (!err) {
//         resolve(hash);
//       } else {
//         reject(err)
//       }
//     })
//   })
// }

let hashPasswordSync = (password) => {
  return bcrypt.hashSync(password, 10);
}


//creates a new model instance, then insets the jwt auth, and attempts to save
//resolve with the new user or rejects with null
let signup = (newUserObj) => {
  return new Promise((resolve, reject) => {
    newUserObj.password = hashPasswordSync(newUserObj.password);
    let newUser = new User(newUserObj);
    let jwttoken = jwt.sign({ email: newUser.email }, jwtkey);
    newUser.tokens.push({ token: jwttoken })
    newUser.save()
      .then((doc) => {
        console.log(doc);
        resolve({
          user: doc,
          newToken: jwttoken
        });

      })
      .catch((err) => {
        console.log("cannot save");
        console.log(err);
        reject(null);
      })
  })
}


// searches for a user with credentials, adds a new jwt token, and returns the user
let login = async (loginObj) => {
  try {
    let user = await User.findByCredentials(loginObj.email, loginObj.password);
    let jwttoken = jwt.sign({ email: user.email }, jwtkey);
    user.tokens.push({ token: jwttoken });
    user = await user.save();
    return { user, token: jwttoken };
  }
  catch (e) {
    console.log(e);
    return null;

  }
}

let logout = async (user, jwttoken) => {
  try {
    //console.log(user);
    await user.ok();
    await user.removeToken(jwttoken);

    await user.save();
    return true;
  }
  catch (e) {
    console.log('cannot logout');
    console.log(e);
    return false;
  }
}

let jwtDecode = async (jwttoken) => {
    try{
        const token = jwttoken;           
        const decodedToken = await jwt.verify(token, jwtkey);
        console.log("dejwt: "+JSON.stringify(decodedToken));
        return decodedToken.email;
    }catch(e){
        console.log(e);
        return null;
    }
}

module.exports = {
  signup,
  login,
  logout,
  jwtDecode
}
