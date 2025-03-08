import {GiCardKingSpades, GiShuttlecock, GiSoccerBall} from "react-icons/gi";
import {
    FaArrowRightFromBracket,
    FaArrowRightToBracket,
    FaDoorClosed,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaGear,
    FaMagnifyingGlass,
    FaPlus,
    FaUser,
    FaXmark,
} from "react-icons/fa6";
import {TbPassword} from "react-icons/tb";
import {MdDelete, MdDeleteForever, MdEdit} from "react-icons/md";

const ICON_CONFIG = {
    BADMINTON_LOGO: <GiShuttlecock className={"rotate-[145deg]"}/>,
    SOCCER_LOGO: <GiSoccerBall/>,
    CARDGAME_LOGO: <GiCardKingSpades/>,
    NEW: <FaPlus/>,
    JOIN_ROOM: <FaArrowRightToBracket/>,
    CLOSE_ROOM: <FaDoorClosed/>,
    LEAVE_ROOM: <FaArrowRightFromBracket/>,
    CLOSE: <FaXmark/>,
    EMAIL: <FaEnvelope className={"h-[1.5rem] text-lg"}/>,
    PASSWORD: <TbPassword className={"h-[1.5rem] text-lg"}/>,
    USER: <FaUser className={"h-[1.5rem] text-lg"}/>,
    VIEW: <FaEye/>,
    HIDE_EYE: <FaEyeSlash/>,
    CONFIG: <FaGear/>,
    SEARCH: <FaMagnifyingGlass className={"h-[1.5rem] text-lg"}/>,
    EDIT: <MdEdit/>,
    SOFT_DELETE: <MdDelete/>,
    PERMANENT_DELETE: <MdDeleteForever/>,
};

export default ICON_CONFIG;
