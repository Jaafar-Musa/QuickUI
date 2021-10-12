const { app, BrowserWindow } = require("electron");

class main {
  constructor() {
    this._Init();
  }
  _Init() {
    // called when electron is initialized, first e fired
    app.whenReady().then(this._createWindow);

    app.on("activate",  ()=> {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
    });

    app.on("window-all-closed", () => {
      // on macOS(darwin), it’s normal for an app to remain active in the dock until the user explicitly quits it
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }

  _createWindow() {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    // load content
    win.loadURL("http://localhost:3000");

    // Open the DevTools.
    win.webContents.openDevTools();
  }
}
let run = new main();
