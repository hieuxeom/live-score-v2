import axios from "axios";
import { useCookies } from "react-cookie";

const useAxios = () => {
	const [cookies] = useCookies(["refresh_token"]);
	const { refresh_token } = cookies;

	const axiosClient = axios.create({
		baseURL: import.meta.env.VITE_BASE_URL,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Cache-Control": "no-cache",
			"Content-Type": "application/json",
			"x-rftk": refresh_token,
		},
	});

	return axiosClient;
};

export default useAxios;
