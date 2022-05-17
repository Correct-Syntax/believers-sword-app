import axios from 'axios'

export const getFireStoreSermons = async (search = "", limit = 50): Promise<string | boolean | any[]> => {
    try {
        return await axios.get(`https://believers-sword-app.herokuapp.com/api/sermon`, {
            params: {
                search,
                limit
            }
        }).then((response) => {
            return response.data;
        }).catch(e => {
            return e;
        })
    } catch (e) {
        return e instanceof Error ? e.message : false;
    }
};
