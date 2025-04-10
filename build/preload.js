const { contextBridge, ipcRenderer } = require("electron");

let msgId = 0;

contextBridge.exposeInMainWorld("apis", {
    sendMessage(channel, req) {
        const id = ++msgId;
        ipcRenderer.send(channel, { id, data: req });
        return new Promise((resolve, reject) => {
            function handler(_, res) {
                if (res.id === id) {
                    // console.log(
                    //     "IPC",
                    //     "channel:",
                    //     channel,
                    //     "Req:",
                    //     req,
                    //     "Res:",
                    //     res.data,
                    // );
                    if (res.err) {
                        reject(res.err);
                        setTimeout(() => alert(res.err), 0);
                    } else {
                        resolve(res.data);
                    }
                    ipcRenderer.removeListener(channel, handler);
                }
            }
            ipcRenderer.on(channel, handler);
        });
    },
});
