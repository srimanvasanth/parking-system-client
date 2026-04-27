import { useState } from "react";
import { commonGet } from "../../utility/apiMethods";

const useCommonGet = () => {

    const [popup, setPopup] = useState({open: false, data: {}});

    const getMethod = async ({url, needPopup, callBack}) => {

        const resp = await commonGet(url);
        if(resp.data?.status === "success"){
            callBack?.(resp.data?.data)
            if(needPopup){
                setPopup({
                    open: true, 
                    data: {
                    title: "Success",
                    bgColor: "success",
                    message: typeof resp.data?.data === "string" ? resp.data?.data : sMsg
                    }
                })
            }
            
        } else if(resp?.statusCode && [401, 403].includes(resp?.statusCode)){
            setPopup({
                open: true, 
                data: {
                    title: "Error",
                    bgColor: "danger",
                    action: "logout",
                    message: (typeof resp?.data === "string" && resp?.data) || res?.message
                }
            })
        } else {
            setPopup({open: true, data: {
                title: "Error",
                bgColor: "danger",
                message: "Something went wrong!"
            }})
        }
        
    }

    return [getMethod, popup, setPopup];
}

export default useCommonGet;