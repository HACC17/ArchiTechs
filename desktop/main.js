const {app, BrowserWindow} = require('electron');

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({width: 1000, height: 600, frame: false, webPreferences: {webSecurity: false}});
  win.loadURL('http://localhost:4200');
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});
