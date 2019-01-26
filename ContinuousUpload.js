const AWS = require('aws-sdk')
const fs = require('fs')
const os = require('os')

module.exports = class ContinousUpload {
  constructor (iamUserKey, iamUserSecret, bucketName) {
    this.iam_user_key = iamUserKey
    this.iam_user_secret = iamUserSecret
    this.bucket_name = bucketName
    this.watcher = null
  }

  getHomeDirectory () {
    let homeDir = os.homedir()
    homeDir += `/Desktop/aws-${this.bucket_name}`
    return homeDir
  }

  watcherSetter () {
    const watcher = fs.watch(this.getHomeDirectory(), (eventname, filename) => {
      this.uploadToS3(
        filename,
        `${this.getHomeDirectory()}/${filename}`,
        this.iam_user_key,
        this.iam_user_secret,
        this.bucket_name
      )
    })
    this.watcher = watcher
  }

  uploadToS3 (name, file, IAM_USER_KEY, IAM_USER_SECRET, BUCKET_NAME) {
    fs.readFile(file, (err, data) => {
      if (err) {
        console.error(err)
      }
      const base64data = Buffer.from(data, 'binary')
      let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
      })
      const params = {
        Bucket: BUCKET_NAME,
        Key: name,
        Body: base64data
      }
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log('error in callback')
          console.log(err)
        }
        console.log('success')
        console.log(data)
      })
    })
  };

  submitClickCB () {
    fs.readdir(this.getHomeDirectory(), (err, files) => {
      if (err) {
        console.error(err)
      }
      files.forEach(file => {
        this.uploadToS3(
          file,
          `${this.getHomeDirectory()}/${file}`,
          this.iam_user_key,
          this.iam_user_secret,
          this.bucket_name
        )
      })
    })
    this.watcherSetter()
  }

  closeWatcher () {
    this.watcher.close()
  }
}
