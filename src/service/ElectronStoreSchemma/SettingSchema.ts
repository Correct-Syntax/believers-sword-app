import ElectronStore from "electron-store";

export const appSettingsStore = new ElectronStore({
    name: "appSettings",
    defaults: {
        setting: {}
    },
    schema: {
        setting: {
            type: "object"
        }
    }
});