let mongoose = require(__dirname+'/../db/mongoose.js');
let validator = require('validator');
let bcrypt = require('bcryptjs');

const communityTemplate = {
    id: String,
    name: String
}

const postTemplate = {
    id: String
}

let userSchemaTemplate = {
    firstName: {
        type: String,
        required: true,
        unique: false
    },

    lastName: {
        type: String,
        required: false,
        default: ''
    },

    email: {
        type: String,
        require: true,
        unique: true,
        validate: (value) => {
            return validator.isEmail(value);
        }
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        default: ''
    },

    createdCommunities: [{
        community: communityTemplate
    }],

    followingCommunities: [{
        community: communityTemplate
    }],

    createdPosts: [{
        post: postTemplate
    }],

    upvotes: [{
        post: postTemplate
    }],

    downvotes: [{
        post: postTemplate
    }],

    tokens: [{
        token:{
            type: String
        }
    }]
};

let userSchema = new mongoose.Schema(userSchemaTemplate, {
  collection: "users"
});

userSchema.statics.findByCredentials = async function (email, password){
    let user = await this.findOne({email })
    if (!user){
        throw new Error('not found');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match){
        throw new Error('not found');
    }
    return user;
}


userSchema.statics.findByEmail = async function (email) {
    console.log("em:"+JSON.stringify(email));
    let user = await this.findOne({"email":email}).select('-tokens -__v -password')
    if (!user){
        throw new Error('not found')
    }
    return user
}


userSchema.methods.removeToken = async function (jwttoken){
    this.tokens = this.tokens.filter(token => {
        if (token.token === jwttoken){
            console.log(`removing ${token}`);
            return false
        }else{
            return true;
        }
    })
}

userSchema.methods.ok = async function(){
    console.log("OK");
    return true;
}

module.exports = userSchema;
