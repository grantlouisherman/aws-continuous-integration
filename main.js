const { app, BrowserWindow } = require('electron');
require('electron-reload')(__dirname);
const ipc = require('electron').ipcMain;
  let win

  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })

    win.loadFile('index.html');
    win.on('closed', () => {
      win = null
    })
  }

  app.on('ready', createWindow);

  ipc.on('submitAction', function(event, data){
    event.sender.send('submitReply', data);
  });

  ipc.on('closeWatcher', function(event, data){
    event.sender.send('closeWatcherReply', data);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  });
