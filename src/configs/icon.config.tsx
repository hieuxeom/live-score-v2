import { GiCardKingSpades, GiShuttlecock, GiSoccerBall } from "react-icons/gi";
import { FaArrowRightFromBracket, FaArrowRightToBracket, FaDoorClosed, FaPlus, FaXmark } from "react-icons/fa6";
const ICON_CONFIG = {
	BADMINTON_LOGO: <GiShuttlecock className={"rotate-[145deg]"} />,
	SOCCER_LOGO: <GiSoccerBall />,
	CARDGAME_LOGO: <GiCardKingSpades />,
	NEW: <FaPlus />,
	JOIN_ROOM: <FaArrowRightToBracket />,
	CLOSE_ROOM: <FaDoorClosed />,
	LEAVE_ROOM: <FaArrowRightFromBracket />,
	CLOSE: <FaXmark />,
};

export default ICON_CONFIG;
