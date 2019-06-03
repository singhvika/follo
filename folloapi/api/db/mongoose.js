let mongoose = require('mongoose');
const config = require(__dirname+'/../../config/config.js');
const server = config.DB_HOST;
const db = 'follo';
const CANNOT_CONNECT_DB = `Cannot Connecto to MondoDB mongodb://localhost:27017`;

// connect to mongoose
mongoose.connect(server, {useNewUrlParser: true});

// return this connection to be used throughout the application
module.exports = mongoose;