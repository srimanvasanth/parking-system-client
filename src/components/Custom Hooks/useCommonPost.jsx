import { useState } from "react";
import { commonPost } from "../../utility/apiMethods";

const useCommonPost = () => {

    const [popup, setPopup] = useState({open: false, data: {}})
    const [postData, setPostData] = useState(null);

    const postMethod = async ({url, data, cancelPopup, sMsg, fMsg, callBack}) => {
        
        try {
            cancelPopup = cancelPopup ? false : true;
            const resp = await commonPost(url, data)
            if(resp.data?.status === "success"){
                //setPostData(resp.data);
                // if(callBack){
                //     callBack();
                // }
                callBack?.(resp.data?.data)
                cancelPopup && setPopup({open: true, data: {
                    title: "Success",
                    bgColor: "success",
                    message: typeof resp.data?.data === "string" ? resp.data?.data : sMsg,
                    ddata: resp.data?.data
                }})
            } else {
                setPopup({open: true, data: {
                    title: "Failed",
                    bgColor: "danger",
                    message: resp.data?.message || (typeof resp.data?.data === "string" ? resp.data?.data : null) || fMsg 
                }})
            } 
        } catch(err) {
            if(err.response?.status && [401, 403].includes(err.response?.status)){
                setPopup({
                    open: true, 
                    data: {
                        title: "Error",
                        bgColor: "danger",
                        action: "logout",
                        message: (typeof err.response?.data?.data === "string" && err.response?.data?.data) || err.response?.data?.message
                    }
                })
            } else if(err.response?.data?.status === "failure") {
                console.log(err.response)
                setPopup({open: true, data: {
                    title: "Failed",
                    bgColor: "danger",
                    message: err.response?.data?.message || (typeof err.response?.data?.data === "string" ? err.response?.data?.data : null) || "Internal Server Error!"
                }})
            } else{
                setPopup({open: true, data: {
                    title: "Error",
                    bgColor: "danger",
                    message: "Something went wrong!"
                }})
            }
        }
        
    }

    return [postMethod, popup, setPopup, postData]
}

export default useCommonPost;