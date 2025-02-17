import { Outlet, useNavigate } from "react-router";
import Button from "../../button";
import { useCookies } from "react-cookie";
import Typography from "../../typography";
import toast from "react-hot-toast";
import ROUTE_PATH from "../../../configs/routes.config";

// interface ClientLayoutProps {}

const ClientLayout = () => {
	const navigate = useNavigate();

	const [cookies, , removeCookies] = useCookies(["access_token", "refresh_token", "username", "user_id"]);

	const handleLogout = () => {
		removeCookies("access_token");
		removeCookies("refresh_token");
		removeCookies("user_id");
		removeCookies("username");
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
						className={"h-max"}
						onClick={() => navigate(ROUTE_PATH.HOME)}
					>
						<img
							src="/logo_text_hrz.png"
							alt=""
							className={"max-h-8 h-full"}
						/>
					</div>
					<div className={"flex items-center gap-4"}>
						{cookies.refresh_token ? (
							<>
								<Typography type={"small"}>{cookies.username ?? "-"}</Typography>
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
			<div className={"absolute bottom-0 my-4"}>
				<div
					className={"h-max flex flex-col items-center gap-1 opacity-20"}
					onClick={() => navigate(ROUTE_PATH.HOME)}
				>
					<Typography
						type={"tiny"}
						className={"text-white"}
					>
						Hosted by
					</Typography>
					<img
						src="/logow_w.png"
						alt=""
						className={"max-h-4 h-full"}
					/>
				</div>
			</div>
		</div>
	);
};

export default ClientLayout;
