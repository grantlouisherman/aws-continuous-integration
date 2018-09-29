const AWS = require('aws-sdk'),
    fs = require('fs');

const FOLDER = `./test`;
const BUCKET_NAME = 'searchapp';
const IAM_USER_KEY = 'AKIAIEVMUNOTWVRCEAUA';
const IAM_USER_SECRET = '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';

function uploadToS3(name, file) {
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
  })
}

fs.watch(FOLDER, (eventname, filename) => {
  uploadToS3(filename, `${FOLDER}/${filename}`);
})