import axios from "axios";

export const commonGet = async (url) => {
    try {
        const res = await axios.get(url, {withCredentials: true});
        return res;
    } catch (e) {
        let errResp =  {
            statusCode: e.response?.status,
            status: e.response?.data?.status,
            data: e.response?.data?.data || e.response?.data?.message,
            message: e.response?.statusText
        }
        return errResp;
    }
}

export const commonPost = (url, payload) => {
    try {
        const res = axios.post(url, payload, {withCredentials: true});
        return res;        
    } catch(e) {
        throw e;
    }
    
    
}