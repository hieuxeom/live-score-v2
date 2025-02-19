import { useEffect } from "react";
import toast from "react-hot-toast";
import ROUTE_PATH from "../../configs/routes.config";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import Loading from "../../components/loading";

interface SignOutProps {}

const SignOut = ({}: SignOutProps) => {
	const navigate = useNavigate();
	const [, , removeCookie] = useCookies(["access_token", "refresh_token", "role", "username"]);

	const handleSignOut = () => {
		navigate(ROUTE_PATH.AUTH.SIGN_IN);
		removeCookie("access_token");
		removeCookie("refresh_token");
		removeCookie("role");
		removeCookie("username");
		toast.success("Đăng xuất thành công");
	};

	useEffect(() => {
		handleSignOut();
	}, []);

	return (
		<div className={"h-screen w-screen flex justify-center items-center"}>
			<Loading />
		</div>
	);
};

export default SignOut;
