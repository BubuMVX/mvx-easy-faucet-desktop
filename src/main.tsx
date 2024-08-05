import {app, BrowserWindow, ipcMain, Menu, shell} from 'electron';
import path from 'path';

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 330,
        height: 650,
        backgroundColor: '#171717',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: !app.isPackaged,
        },
        icon: path.join(__dirname, '../../icons/icon.ico'),
        resizable: false,
    });

    ipcMain.handle('openBrowser', (_event, ...args) => {
        // noinspection JSIgnoredPromiseFromCall
        shell.openExternal(args[0])
    });
    ipcMain.handle('getVersion', () => {
        return app.getVersion()
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        // noinspection JSIgnoredPromiseFromCall
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        const express = require('express')
        const server = express()
        server.use('/', express.static(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}`)));
        const infos = server.listen(65535, 'localhost', () => mainWindow.loadURL(`http://localhost:${infos.address().port}/index.html`));
        // noinspection JSIgnoredPromiseFromCall
        //mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    mainWindow.webContents.openDevTools();
};

Menu.setApplicationMenu(null);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
