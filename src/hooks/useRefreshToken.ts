import { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import useAxios from "./useAxios";

const useRefreshToken = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["refresh_token", "access_token"]);
	const axiosClient = useAxios();

	return async () => {
		const { refresh_token } = cookies;
		if (refresh_token) {
			try {
				const token = await axiosClient.get("/accounts/rftk");

				const newAccessToken = token.data.results.access_token;

				setCookie("access_token", newAccessToken, { path: "/", maxAge: 10 });

				return newAccessToken;
			} catch (error) {
				if ((error as AxiosError).status === 400) {
					removeCookie("refresh_token", { path: "/", domain: "localhost" });
					removeCookie("access_token", { path: "/", domain: "localhost" });
					return null;
				}
			}
		} else {
			return null;
		}
	};
};

export default useRefreshToken;
