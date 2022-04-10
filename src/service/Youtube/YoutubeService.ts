const BELIEVERS_SWORD_GOOGLE_API = process.env.VUE_APP_BELIEVERS_SWORD_GOOGLE_API_KEY;

export const getYoutubeLinkForApi = (video_id: string) => {
    return `https://www.googleapis.com/youtube/v3/videos?id=${video_id}&key=${BELIEVERS_SWORD_GOOGLE_API}&part=snippet,contentDetails,statistics,status`;
};
