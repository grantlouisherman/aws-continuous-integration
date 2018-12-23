const ipc = require('electron').ipcRenderer;

const {
  submitClickCB,
  createHomeDirectory
  } = require('./utils');

document.getElementById('SUBMIT').addEventListener('click', () => {
  const BUCKET_NAME = document.getElementById("BUCKET_NAME");
  const IAM_USER_KEY = document.getElementById("IAM_USER_KEY");
  const IAM_USER_SECRET = document.getElementById("IAM_USER_SECRET");
  createHomeDirectory();
  ipc.once('submitReply', (event, response) => {
    submitClickCB.call(this, IAM_USER_KEY.value,IAM_USER_SECRET.value,BUCKET_NAME.value);
  });
  ipc.send('submitAction', 'click');
});
