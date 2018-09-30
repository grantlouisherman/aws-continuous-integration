const express = require('express');
const app = express();
const AWS = require('aws-sdk'),
    fs = require('fs');
const PORT = 4000


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

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/aws', (req, res) => {
  const {
    folder_location,
    iam_user_key,
    iam_user_secret,
    bucket_name
  } = req.headers;
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
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
