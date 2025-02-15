import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useRefreshToken from "./useRefreshToken";

const useAxiosServer = () => {
	const getRefreshToken = useRefreshToken();
	const [cookies, , removeCookie] = useCookies(["refresh_token", "access_token"]);

	const axiosStaffServer = axios.create({
		baseURL: import.meta.env.VITE_BASE_URL,
		headers: {
			"Content-Type": "application/json",
		},
	});

	useEffect(() => {
		const requestIntercept = axiosStaffServer.interceptors.request.use(
			async (config) => {
				const accessToken = cookies.access_token;

				if (!config.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${accessToken}`;
				}

				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axiosStaffServer.interceptors.response.use(
			(response) => response,
			async (error) => {
				if (error?.response?.status === 500 && error?.response?.data?.message === "jwt malformed") {
					removeCookie("refresh_token", { path: "/", domain: "localhost" });
					removeCookie("access_token", { path: "/", domain: "localhost" });
				}
				const prevRequest = error?.config;
				if (error?.response?.status === 401 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await getRefreshToken();
					prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
					return axiosStaffServer(prevRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosStaffServer.interceptors.request.eject(requestIntercept);
			axiosStaffServer.interceptors.response.eject(responseIntercept);
		};
	}, [getRefreshToken]);

	return axiosStaffServer;
};

export default useAxiosServer;
