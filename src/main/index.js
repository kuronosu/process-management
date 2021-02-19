import path from 'path';
import { app, BrowserWindow } from 'electron';

// load from url when env is development, from file when is production
const entryUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/index.html'
    : `file://${path.join(__dirname, 'index.html')}`;

let window = null;

app.on('ready', () => {
  window = new BrowserWindow({ width: 800, height: 600 });
  window.setMenu(null)
  window.loadURL(entryUrl);
  window.on('closed', () => (window = null));
  process.env.NODE_ENV === 'development' && window.webContents.openDevTools();
});

app.on('window-all-closed', () => {
  // mac is a special boy ...
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
