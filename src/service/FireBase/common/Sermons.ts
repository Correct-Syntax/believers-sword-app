import { getDocs, limit, orderBy, query, startAt } from "firebase/firestore/lite";
import { sermonCollection } from "../FireBaseService";

export const getFireStoreSermons = async (): Promise<string | boolean | any[]> => {
    try {
        const sermonSnapShot = query(sermonCollection, orderBy("title"), startAt(0), limit(2));
        const documentSnapshots = await getDocs(sermonSnapShot);
        const cityList = documentSnapshots.docs.map((doc) => doc.data());
        return cityList;
    } catch (e) {
        return e instanceof Error ? e.message : false;
    }
};
