const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const env = require (__dirname+'/../../config/s3.env.js');

aws.config.update({
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: env.AWS_ACCESS_KEY,
    region: env.REGION // region of your bucket
  });
  
const s3Config = new aws.S3();


const upload = multer({
    storage: multerS3({
      s3: s3Config,
      bucket: env.COMMUNITY_BUCKET_NAME,
      acl: "public-read",
      key: function (req, file, cb) {
        cb(null, file.originalname);
      }
    })
});

let uploadImage = (req, res, next) => {
    const singleUpload = upload.single('commImage');
    singleUpload(req, res, function (err, some) {
        if (!err){
            next();
        }else{
            console.log(err);
            console.log('Cannot upload to S3')
            res.status(400).send({
                status: 400,
                message: 'cannot signup'
            })
        }
    });

}

module.exports = uploadImage;