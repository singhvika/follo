const express = require ('express');
const authRoutes = require(__dirname+'/api/routes/authenticationRoutes/authenticationRoute.js');
const communityRoutes = require(__dirname+'/api/routes/communityRoutes/communityRoute.js');
const userRoutes = require(__dirname+'/api/routes/userRoutes/userRoute.js');
const postRoutes = require(__dirname+'/api/routes/postRoute/postRoute.js');

const bodyParser = require('body-parser');
var cors = require('cors');
let app = express();

console.log(process.env.DB_HOST);
app.use(cors())
app.use(bodyParser.json());
app.use('/', authRoutes);
app.use('/',communityRoutes);
app.use('/',userRoutes);
app.use('/community',postRoutes);

app.listen(3000, err => {
    if (err){
        console.log(err);
    }
    console.log('app started on 3000');
})

