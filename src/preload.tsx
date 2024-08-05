import {contextBridge, ipcRenderer} from 'electron';

process.once("loaded", () => {
    contextBridge.exposeInMainWorld('electron', {
        openBrowser: (url: string) => ipcRenderer.invoke('openBrowser', url),
        getVersion: async () => {
            return await ipcRenderer.invoke('getVersion')
        },
    })
})
