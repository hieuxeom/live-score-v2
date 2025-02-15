import { Outlet, useNavigate } from "react-router";
import Button from "../../button";
import { useCookies } from "react-cookie";
import Typography from "../../typography";
import toast from "react-hot-toast";
import ROUTE_PATH from "../../../configs/routes.config";

// interface ClientLayoutProps {}

const ClientLayout = () => {
	const navigate = useNavigate();

	const [cookies, , removeCookies] = useCookies(["access_token", "refresh_token", "email", "user_id"]);

	const handleLogout = () => {
		removeCookies("access_token");
		removeCookies("refresh_token");
		removeCookies("user_id");
		removeCookies("email");
		toast.success("Đăng xuất thành công");
	};

	return (
		<div className={"relative w-screen min-h-screen h-full flex flex-col items-center"}>
			<nav
				className={
					"absolute top-0 left-0 w-full flex justify-center items-center bg-white rounded-bl-xl rounded-br-xl p-2"
				}
			>
				<div className={"w-full max-w-7xl flex justify-between items-center"}>
					<div
						className={"h-4"}
						onClick={() => navigate(ROUTE_PATH.HOME)}
					>
						<img
							src="/logow_b.png"
							alt=""
							className={"h-full"}
						/>
					</div>
					<div className={"flex items-center gap-4"}>
						{cookies.refresh_token ? (
							<>
								<Typography type={"small"}>{cookies.email ?? "-"}</Typography>
								<Button
									color={"danger"}
									size={"sm"}
									onClick={() => {
										handleLogout();
									}}
								>
									Đăng xuất
								</Button>
							</>
						) : (
							<Button
								color={"default"}
								size={"sm"}
								onClick={() => navigate(ROUTE_PATH.AUTH.SIGN_IN)}
							>
								Đăng nhập
							</Button>
						)}
					</div>
				</div>
			</nav>
			<div className={"bg-primary-gradient w-full"}>
				<Outlet />
			</div>
		</div>
	);
};

export default ClientLayout;
