const ipc = require('electron').ipcRenderer;

const { submitClickCB, unWatchFileCB } = require('./utils');

const BUCKET_NAME = document.getElementById("BUCKET_NAME");
const IAM_USER_KEY = document.getElementById("IAM_USER_KEY");
const IAM_USER_SECRET = document.getElementById("IAM_USER_SECRET");
const FOLDER = document.getElementById("FOLDER");
document.getElementById('SUBMIT').addEventListener('click', () => {
  ipc.once('submitReply', function(event, response){
    submitClickCB.call(this,FOLDER.value, IAM_USER_KEY.value, IAM_USER_SECRET.value, BUCKET_NAME.value )
   });
   ipc.send('submitAction', 'clicked');
});
