const ipc = require('electron').ipcRenderer;
const {
  submitClickCB,
  createHomeDirectory
  } = require('./utils');
const ContinousUpload = require('./ContinuousUpload.js');

let currentContUpload;

document.getElementById('SUBMIT').addEventListener('click', () => {
  
  const BUCKET_NAME = document.getElementById("BUCKET_NAME");
  const IAM_USER_KEY = document.getElementById("IAM_USER_KEY");
  const IAM_USER_SECRET = document.getElementById("IAM_USER_SECRET");
  createHomeDirectory();
  const ContUpload = new ContinousUpload(IAM_USER_KEY.value, IAM_USER_SECRET.value, BUCKET_NAME.value);
  currentContUpload = ContUpload;

  ipc.once('submitReply', (event, response) => {
    ContUpload.submitClickCB();
  });
  ipc.send('submitAction', 'click');
});

document.getElementById('UNWATCH').addEventListener('click', () => {

  ipc.once('closeWatcherReply', (event, response) => {
    currentContUpload.closeWatcher();
  });

  ipc.send('closeWatcher', 'click');
})
