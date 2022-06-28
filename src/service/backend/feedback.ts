import Axios from "../Axios/Axios";

export interface Feedback {
    title: string;
    description: string;
    category: string;
}

export const addFeedback = async (feedback: Feedback) => {
    await Axios.post("/api/v1/feedback/create", feedback).then((res) => {
        return res
    }).catch(e => console.log(e));
}

export const getMyFeedbacks = async () => {
    return Axios.get("/api/v1/feedback/my");
}