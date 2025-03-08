import axios from "axios";
import {useCookies} from "react-cookie";
import {TContentType} from "../types/general";

const useAxios = (contentType: TContentType = "application/json") => {
    const [cookies] = useCookies(["refresh_token"]);
    const {refresh_token} = cookies;

    const axiosClient = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Content-Type": contentType,
            "x-rftk": refresh_token,
        },
    });

    return axiosClient;
};

export default useAxios;
