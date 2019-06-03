let mongoose = require(__dirname + '/../db/mongoose.js');

const eventTemplate = {
    name: String,
    desc: String,
    location: String,
    date: Date,
    url: String
}

const commentTemplate = {
    username: String,
    commentDate: Date,
    commentText: String
}

let postSchemaTemplate = {
    title: {
        type: String,
        required: true,
        unique: false
    },

    content: {
        type: String,
        required: true,
        default: ''
    },

    type: {
        type: String,
        require: true,
        default: 'text'
    },

    event_desc: [{
        event: eventTemplate
    }],

    post_media: [{
        media: String
    }],

    parent_community: {
        _id: String,
        cname: String
    },

    upvotes: {
        type: Number,
		default: 1
    },

    downvotes: {
        type: Number,
		default: 0
    },

    created_by: {
        _id: String,
        username: String
    },

    posted_on: {
        type: Date,
        default: Date.now
    },

    last_updated_on: {
        type: Date,
        default: Date.now
    },

    is_active: {
        type: Boolean,
        default: true
    },
    comments: [{
        comment: commentTemplate
    }]
};

let postSchema = new mongoose.Schema(postSchemaTemplate, {
    collection: "posts"
});

postSchema.statics.findById = async function (id) {
    let post = await this.findOne({
        "_id": id
    })
    if (!post) {
        return null;
    }
    return post;
}

postSchema.statics.updateById = async function (id, oldPost) {
    let post = await this.findOne({
        "_id": id
    })
    if (!post) {
        return null;
    }
    return post;
}


postSchema.statics.findByCommunity = async function (community) {
    let posts = await this.find({
        "parent_community.cname": community
    })
    if (!posts) {
        return [];
    }
    return posts;
}

postSchema.statics.findByUser = async function (username) {
    let posts = await this.find({
        "created_by.username": username
    })
    if (!posts) {
        return [];
    }
    return posts;
}

postSchema.statics.searchPost = async function (key) {
    //let posts = await this.find({title: new RegExp('^'+key+'$', "i")})
    
    key=key.trim();
    console.log("--"+key)
    let posts = await this.find()
        .and([
            {
                $or: [{
                    title: {
                        $regex: '.*' + key + '.*',
                        $options: 'i'
                    }
                },{
                    content: {
                        $regex: '.*' + key + '.*',
                        $options: 'i'
                    }
                }]
            }
        ])
    
    //let posts = await this.find({title: {$regex: '.*' + key + '.*',$options: 'i'}})
    if (!posts) {
        return [];
    }
    return posts;
}


postSchema.methods.ok = async function () {
    console.log("OK");
    return true;
}

module.exports = postSchema;