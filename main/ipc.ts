import { BrowserWindow, IpcMainEvent, dialog, ipcMain } from "electron";
import { openPDFFile } from "./pdf";

export function notifyConfigChanged() {
    BrowserWindow.getAllWindows().forEach((win) => {
        win.webContents.send("config_changed", "todo");
    });
}

function addAsyncListener<K extends keyof IpcMessage>(
    channel: K,
    action: (
        req: IpcMessage[K][0],
        event: IpcMainEvent,
    ) => Promise<IpcMessage[K][1]>,
) {
    ipcMain.on(
        channel,
        async (e: IpcMainEvent, req: RequestData<IpcMessage[K][0]>) => {
            try {
                const result = await action(req.data, e);
                e.reply(channel, { id: req.id, data: result });
            } catch (ex) {
                e.reply(channel, { id: req.id, err: `${ex}` });
            }
        },
    );
}

addAsyncListener("open", async () => {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length === 0) {
        return null;
    }
    const ret = await dialog.showOpenDialog(windows[0], {
        properties: ["openFile"],
        filters: [
            {
                extensions: [".pdf"],
                name: "Only PDF",
            },
        ],
    });
    if (ret.canceled || ret.filePaths.length === 0) {
        return null;
    }
    const filepath = ret.filePaths[0];
    return openPDFFile(filepath);
});
