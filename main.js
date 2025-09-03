const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Point to the preload script
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.setMenuBarVisibility(false);
  win.loadURL("https://www.flutterflow.io/");

  win.webContents.setWindowOpenHandler(({ url }) => {
    win.loadURL(url);
    return { action: 'deny' };
  });

  // Listen for the 'go-back' event from the preload script
  ipcMain.on('go-back', () => {
    if (win.webContents.canGoBack()) {
      win.webContents.goBack();
    }
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});