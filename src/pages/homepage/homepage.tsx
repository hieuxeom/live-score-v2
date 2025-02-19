import { useNavigate } from "react-router";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import ICON_CONFIG from "../../configs/icon.config";

// interface HomepageProps {}

const Homepage = () => {
	const navigate = useNavigate();

	return (
		<Wrapper
			size={"full"}
			orientation={"horizontal"}
			centerX={true}
			centerY={true}
			className={"min-h-screen h-full"}
		>
			<div className={"xl:w-max w-full px-8 grid xl:grid-cols-2 grid-cols-1 gap-4"}>
				<Button
					fullWidth
					variant="bordered-3d"
					color={"secondary"}
					size={"2xl"}
					startIcon={ICON_CONFIG.CARDGAME_LOGO}
					onClick={() => navigate("/card-game")}
				>
					Bài Tiến lên
				</Button>
				{/* <Button
					fullWidth
					variant="bordered-3d"
					color={"primary"}
					size={"2xl"}
					startIcon={ICON_CONFIG.BADMINTON_LOGO}
					onClick={() => navigate("/badminton")}
				>
					Cầu lông
				</Button>

				<Button
					fullWidth
					variant="bordered-3d"
					color={"secondary"}
					size={"2xl"}
					startIcon={ICON_CONFIG.SOCCER_LOGO}
					onClick={() => navigate("/football")}
				>
					Bóng đá
				</Button> */}

				<Button
					fullWidth
					variant="solid-3d"
					// variant="bordered"
					color={"secondary"}
					size={"2xl"}
					isDisabled={true}
				>
					Updating...
				</Button>
			</div>
		</Wrapper>
	);
};

export default Homepage;
