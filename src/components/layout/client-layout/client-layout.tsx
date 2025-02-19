import { Outlet, useNavigate } from "react-router";
import ROUTE_PATH from "../../../configs/routes.config";
import Header from "../../partials/header";
import Typography from "../../typography";

// interface ClientLayoutProps {}

const ClientLayout = () => {
	const navigate = useNavigate();

	return (
		<div className={"relative w-full min-h-screen h-full flex flex-col items-center"}>
			<Header />
			<div className={"bg-primary-gradient w-full min-h-screen h-full"}>
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
