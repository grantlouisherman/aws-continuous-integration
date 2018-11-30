const AWS = require('aws-sdk'),
    fs = require('fs');

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
    })
}
;

function submitClickCB(
  folder_location,
  iam_user_key,
  iam_user_secret,
  bucket_name ){
  fs.readdir(folder_location, (err, files) => {
    files.forEach(file => {
      uploadToS3(
        file,
        `${folder_location}/${file}`,
        iam_user_key,
        iam_user_secret,
        bucket_name
      );
    });
  })
  fs.watch(folder_location, (eventname, filename) => {
    uploadToS3(
      filename,
      `${folder_location}/${filename}`,
      iam_user_key,
      iam_user_secret,
      bucket_name
    );
  })
}

function unWatchFileCB(folder_location){
  fs.readdir(folder_location, (err, files) => {
    files.forEach(file => {
      fs.unwatchFile(`${folder_location}/$${file}`, () => {
        console.log('file unwatched');
      })
    });
  })
}

module.exports = {
  submitClickCB,
  unWatchFileCB
}
