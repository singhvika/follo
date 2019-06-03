let mongoose = require(__dirname+'/../../db/mongoose.js');
var mongooseIncrement = require('mongoose-increment');
var increment = mongooseIncrement(mongoose);

let commSchema = require(__dirname+'/../../schema/commSchema.js');

commSchema.plugin(increment, {
    modelName: 'commModel',
    fieldName: 'cid',
  });

let commModel = mongoose.model('commModel', commSchema);

module.exports = commModel;