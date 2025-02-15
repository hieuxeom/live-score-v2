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
			<div className={"grid grid-cols-2 gap-4"}>
				<Button
					fullWidth
					variant="bordered-3d"
					color={"primary"}
					size={"2xl"}
					startIcon={ICON_CONFIG.BADMINTON_LOGO}
					onClick={() => navigate("/badminton")}
				>
					Badminton
				</Button>

				<Button
					fullWidth
					variant="bordered-3d"
					color={"secondary"}
					size={"2xl"}
					startIcon={ICON_CONFIG.SOCCER_LOGO}
					onClick={() => navigate("/football")}
				>
					Football
				</Button>
				<Button
					fullWidth
					variant="bordered-3d"
					color={"secondary"}
					size={"2xl"}
					startIcon={ICON_CONFIG.CARDGAME_LOGO}
					onClick={() => navigate("/card-game")}
				>
					Card Game
				</Button>
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
