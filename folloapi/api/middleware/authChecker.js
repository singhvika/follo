const jwt = require("jsonwebtoken");
const config = require(__dirname + "/../../config/config.js");
const jwtKey = config.JWT_KEY;
console.log(jwtKey);
let User = require(__dirname + "/../models/userModel/userModel.js");

let authChecker = async (req, res, next) => {
    if (req.header('Authorization')){
        console.log('some authorization header found');
        try{
            const token = req.header('Authorization').replace('Bearer ','');
            console.log(token);
            console.log(jwtKey);
            
    
            const decodedToken = jwt.verify(token, jwtKey);
            const user = await User.findOne({email: decodedToken.email, 'tokens.token': token});
            if(!user){
                throw new Error('User Not found')
            }
            else{
                const cuser = user;
                req.user = cuser;
                req.token = token;
                next();
            }
        }catch(e){
            console.log(e);
            res.status(401).send({
                status: 401,
                message: 'Un-authenticated'
            });
        }
        
    }
    else{
        res.status(401).send({
            status: 401,
            msg:"unauthenticated"
        });

    }
  }

module.exports = authChecker;

