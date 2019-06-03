let mongoose = require(__dirname+'/../../db/mongoose.js');

let postSchema = require(__dirname+'/../../schema/postSchema.js')

let postModel = mongoose.model('postModel', postSchema);

module.exports = postModel;