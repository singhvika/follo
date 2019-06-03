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
      bucket: env.USERS_BUCKET_NAME,
      acl: "public-read",
      key: function (req, file, cb) {
        cb(null, file.originalname);
      }
    })
});

let uploadImage = (req) => {

    return new Promise((resolve, reject) => {
        const singleUpload = upload.single('image');
        singleUpload(req, res, function (err, some) {
            if (!err){
                resolve(req);
            }else{
                console.log(err);
                console.log('Cannot upload to S3')
                reject(res);
            }
        });
    })

    
    

}

module.exports = uploadImage;