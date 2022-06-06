import { ipcRenderer } from "electron";
import { usePrayerListStore } from "@/store/prayerListStore"


export const PrayerListIpcRenderer = () => {

    const prayerListStore = usePrayerListStore()

    ipcRenderer.on("getPrayerLists", (event, payload) => {
        const data = Object.entries(payload);

        // eslint-disable-next-line
        prayerListStore.setPrayerList(data.length ? data.map(([key, value]) => value) : []);
    });
}