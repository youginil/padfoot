import { app, BrowserWindow } from "electron";
import path from "path";
import logger from "./logger";
import "./ipc";

logger.info("start app...");

app.whenReady().then(async () => {
    const preloadScriptPath = path.join(
        app.getAppPath(),
        (app.isPackaged ? "" : "../") + "build/preload.js",
    );
    const win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: preloadScriptPath,
        },
    });
    if (app.isPackaged) {
        await win.loadFile("dist/index.html");
    } else {
        await win.loadURL("http://127.0.0.1:3900");
        win.webContents.openDevTools();
    }
    await app.dock?.show();
    logger.info("app is started");
});

app.on("window-all-closed", () => {
    logger.info("app quit");
    app.quit();
});
