import { redirect } from "react-router-dom";
import { commonGet } from "./apiMethods";

export async function authLoader() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const res = await commonGet(`${apiUrl}/checkauth`);
    
    if(!(res.data?.status === "success")) {
        throw redirect("/login");
    }

    return null;
}