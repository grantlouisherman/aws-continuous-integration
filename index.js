const express = require('express');
const app = express();
const AWS = require('aws-sdk'),
    fs = require('fs');
const FOLDER = `./test`;
const BUCKET_NAME = 'searchapp';
const PORT = 4000


function uploadToS3(name, file) {
  fs.readFile(file, function (err, data) {
    const base64data = new Buffer(data, 'binary');
    let s3bucket = new AWS.S3({
       accessKeyId: keys.IAM_USER_KEY,
       secretAccessKey: keys.IAM_USER_SECRET,
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
  fs.watch(FOLDER, (eventname, filename) => {
    uploadToS3(filename, `${FOLDER}/${filename}`);
  })
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
