const AWS = require('aws-sdk'),
    fs = require('fs'),
    os = require('os');

module.exports = class ContinousUpload {
  constructor(iam_user_key,iam_user_secret, bucket_name){
      this.iam_user_key = iam_user_key;
      this.iam_user_secret = iam_user_secret;
      this.bucket_name = bucket_name;
      this.watcher;
  }

  getHomeDirectory(){
    let homeDir = os.homedir();
    homeDir+='/Desktop/TEST_FOLDER';
    return homeDir;

  };

  watcherSetter(){
    const watcher = fs.watch(this.getHomeDirectory(), (eventname, filename) => {
      this.uploadToS3(
        filename,
        `${this.getHomeDirectory()}/${filename}`,
        this.iam_user_key,
        this.iam_user_secret,
        this.bucket_name
      );
    });
    this.watcher = watcher;
  }

  uploadToS3(name, file, IAM_USER_KEY, IAM_USER_SECRET, BUCKET_NAME) {
    fs.readFile(file,  (err, data) =>  {
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

  submitClickCB(){
    fs.readdir(this.getHomeDirectory(), (err, files) => {
      files.forEach(file => {
        this.uploadToS3(
          file,
          `${this.getHomeDirectory()}/${file}`,
          this.iam_user_key,
          this.iam_user_secret,
          this.bucket_name
        );
      });
    });
    this.watcherSetter();
  }

  closeWatcher(){
    this.watcher.close();
  }
}
