import axios from 'axios';
import { url } from '../backend/constants';
import session from '../session/session';

axios.defaults.baseURL = url;
axios.defaults.headers.common['Authorization'] = `Bearer ${session.get('backendToken')}`;

export default {
    get: (url: string) =>
        axios
            .get(url)
            .then((res: any) => res)
            .catch((error) => error),
    post: (url: string, data: any = null) =>
        axios
            .post(url, data ? data : {})
            .then((res: any) => res)
            .catch((error) => error),
    put: (url: string, data: any = null) =>
        axios
            .put(url, data ? data : {})
            .then((res: any) => res)
            .catch((error) => error),
    delete: (url: string) =>
        axios
            .delete(url)
            .then((res: any) => res)
            .catch((error) => error),
    download: (url: string, authorize = false, options: { downloadProgress: any } | null | undefined = null) =>
        axios
            .get(
                url,
                authorize
                    ? {
                        responseType: 'blob',
                        onDownloadProgress: (progressEvent) => {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                            options?.downloadProgress(progress);
                        },
                    }
                    : { responseType: 'blob' }
            )
            .then((res: any) => res)
            .catch((error) => error),
};
