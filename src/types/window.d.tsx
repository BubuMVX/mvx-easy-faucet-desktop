interface Window {
    electron: {
        openBrowser: (url: string) => void,
        getVersion: () => Promise<string>,
    }
}
