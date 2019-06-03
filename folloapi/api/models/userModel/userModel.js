let mongoose = require(__dirname+'/../../db/mongoose.js');

let userSchema = require(__dirname+'/../../schema/userSchema.js')

let userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;