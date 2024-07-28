// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron';

process.once("loaded", () => {
    contextBridge.exposeInMainWorld('electron', {
        openBrowser: (url: string) => ipcRenderer.invoke('openBrowser', url),
        getVersion: async () => {
            return await ipcRenderer.invoke('getVersion')
        },
    })
})
