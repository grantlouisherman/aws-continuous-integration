const { spawn } = require('child_process');

const startServer = spawn('node', ['index.js']);
const startElectron = spawn('electron',['.']);

startServer.stdout.on('data', (data) => {
  console.log(`startServer stdout:\n${data}`);
});

startServer.stderr.on('data', (data) => {
  console.error(`startServer stderr:\n${data}`);
});

startServer.on('exit', function (code, signal) {
  console.log('startServer process exited with ' +
              `code ${code} and signal ${signal}`);
});

startElectron.stdout.on('data', (data) => {
  console.log(`startElectron stdout:\n${data}`);
});

startElectron.stderr.on('data', (data) => {
  console.error(`startElectron stderr:\n${data}`);
});

startElectron.on('exit', function (code, signal) {
  console.log('startElectron process exited with ' +
              `code ${code} and signal ${signal}`);
});
