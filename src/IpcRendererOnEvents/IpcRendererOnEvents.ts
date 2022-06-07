import { ipcRenderer } from "electron";
import { usePrayerListStore } from "@/store/prayerListStore"


export const PrayerListIpcRenderer = () => {

    const prayerListStore = usePrayerListStore()

    ipcRenderer.on("getPrayerLists", (event, payload) => {
        prayerListStore.setPrayerList(payload);
    });

    ipcRenderer.on("getDonePrayerList", (event, payload) => {
        prayerListStore.setDonePrayerList(payload);
    });
}