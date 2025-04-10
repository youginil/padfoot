declare global {
    interface Window {
        apis: {
            sendMessage<K extends keyof IpcMessage>(
                channel: K,
                req: IpcMessage[K][0],
            ): Promise<IpcMessage[K][1]>;
        };
    }
}
