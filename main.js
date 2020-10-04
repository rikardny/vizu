const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
    let win = new BrowserWindow({
        width: 1024,
        height: 768,
        title: "Player",
        webPreferences: {
            nodeIntegration: true,
        }
    });
    win.loadFile("index.html");
    win.setMenu(null);
});