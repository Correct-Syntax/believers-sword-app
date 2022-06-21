import { url } from './constants';
import axios from 'axios'

export const getFireStoreSermons = async (search = "", limit = 50): Promise<string | boolean | any[]> => {
    try {
        return await axios.get(`${url}/api/sermon`, {
            params: {
                search,
                limit
            }
        }).then((response) => {
            return response.data;
        }).catch(() => {
            return false;
        })
    } catch (e) {
        return e instanceof Error ? e.message : false;
    }
};
