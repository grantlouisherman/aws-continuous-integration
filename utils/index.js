const AWS = require('aws-sdk'),
    fs = require('fs'),
    os = require('os');

function uploadToS3(name, file, IAM_USER_KEY, IAM_USER_SECRET, BUCKET_NAME) {
  fs.readFile(file, function (err, data) {
    const base64data = new Buffer(data, 'binary');
    let s3bucket = new AWS.S3({
       accessKeyId: IAM_USER_KEY,
       secretAccessKey: IAM_USER_SECRET,
       Bucket: BUCKET_NAME,
     });
      const params = {
        Bucket: BUCKET_NAME,
        Key: name,
        Body: base64data
      };
       s3bucket.upload(params, function (err, data) {
          if (err) {
           console.log('error in callback');
           console.log(err);
          }
          console.log('success');
          console.log(data);
        });
    });
};

function getHomeDirectory(){
  let homeDir = os.homedir();
  homeDir+='/Desktop/TEST_FOLDER';
  return homeDir;

};

function createHomeDirectory(){
  fs.mkdir(getHomeDirectory(),(err) => {
    if(err){
      console.error(err)
    }
  });
};

function submitClickCB(
  iam_user_key,
  iam_user_secret,
  bucket_name ){
  fs.readdir(getHomeDirectory(), (err, files) => {
    files.forEach(file => {
      uploadToS3(
        file,
        `${getHomeDirectory()}/${file}`,
        iam_user_key,
        iam_user_secret,
        bucket_name
      );
    });
  })
  fs.watch(getHomeDirectory(), (eventname, filename) => {
    uploadToS3(
      filename,
      `${getHomeDirectory()}/${filename}`,
      iam_user_key,
      iam_user_secret,
      bucket_name
    );
  })
}


module.exports = {
  submitClickCB,
  createHomeDirectory,
}
