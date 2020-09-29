const { app, BrowserWindow } = require("electron");
require("electron-reload")(__dirname);

app.on("ready", () => {
    let win = new BrowserWindow({
        width: 800,
        height: 720,
        title: "Player",
        webPreferences: {
            nodeIntegration: true,
        }
    });
    win.loadFile("index.html");
});