export const appUpdate = {
    state: {
        updateAvailable: false,
        error: {},
        downloadProgress: null
    },
    mutations: {
        setUpdateAvailable(s: any, payload: boolean) {
            s.updateAvailable = payload;
        },
        setUpdateError(s: any, payload: any): void {
            s.error = payload;
        },
        setDownloadProgress(s: any, payload: any): void {
            s.downloadProgress = payload;
        }
    },
    actions: {
        setUpdateAvailable(context: any, payload: boolean) {
            context.commit("setUpdateAvailable", payload);
        },
        setUpdateError(context: any, payload: any): void {
            context.commit("setUpdateError", payload);
        },
        setDownloadProgress(context: any, payload: any): void {
            context.commit("setDownloadProgress", payload);
        }
    }
};
