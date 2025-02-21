import { useNavigate } from "react-router";
import ROUTE_PATH from "../../../configs/routes.config";
import { sliceText } from "../../../utils/slice-text";
import Button from "../../button";
import Typography from "../../typography";
import { useCookies } from "react-cookie";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
	const navigate = useNavigate();

	const [cookies] = useCookies(["access_token", "refresh_token", "username", "user_id"]);

	return (
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
							<Typography type={"small"}>
								{cookies.username ? sliceText(cookies.username, 8) : "-"}
							</Typography>
							<Button
								color={"danger"}
								size={"sm"}
								onClick={() => {
									navigate(ROUTE_PATH.AUTH.SIGN_OUT);
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
	);
};

export default Header;
