import { useNavigate } from "react-router";
import { TRoomInfo } from "../../../../types/cardgame";
import { useCookies } from "react-cookie";
import ROUTE_PATH from "../../../../configs/routes.config";
import Typography from "../../../../components/typography";
import Button from "../../../../components/button";
import ICON_CONFIG from "../../../../configs/icon.config";

interface RoomRowProps {
	roomInfo: TRoomInfo;
}

const RoomRow = ({ roomInfo }: RoomRowProps) => {
	const navigate = useNavigate();

	const [cookies] = useCookies(["username"]);

	const handleEnterRoom = () => {
		navigate(ROUTE_PATH.CARD_GAME.GAME_ROOM(roomInfo.room_id));
	};

	return (
		<div
			onClick={cookies.username && handleEnterRoom}
			className={
				"w-full p-4 flex justify-between items-center border-secondary border-b-8 border-2 rounded-2xl hover:border-secondary transtion-all duration-300 cursor-pointer"
			}
		>
			<Typography
				type={"h2"}
				className={"w-1/5 text-primary font-black"}
			>
				#{roomInfo.room_id}
			</Typography>
			<div className={"w-3/5 flex justify-center items-center gap-4"}>
				<div className={"flex flex-col items-center gap-2 px-4 h-full"}>
					<Typography
						type={"p"}
						className={"text-secondary"}
					>
						Loại phòng
					</Typography>
					<Typography
						type={"h3"}
						className={"text-primary"}
					>
						Tính điểm
					</Typography>
				</div>
				<div className={"flex flex-col items-center gap-2 px-4 h-full border-l-2 border-r-2 border-secondary"}>
					<Typography
						type={"p"}
						className={"text-secondary"}
					>
						Số người chơi
					</Typography>
					<Typography
						type={"h3"}
						className={"text-primary"}
					>
						4
					</Typography>
				</div>
				<div className={"flex flex-col items-center gap-2 px-4 h-full"}>
					<Typography
						type={"p"}
						className={"text-secondary"}
					>
						Thời gian tạo
					</Typography>
					<Typography
						type={"h3"}
						className={"text-primary"}
					>
						{new Date(roomInfo.created_at).toLocaleTimeString("vi-VN")}
					</Typography>
				</div>
			</div>
			<div className={"w-1/5 flex items-center justify-end"}>
				{roomInfo.is_closed ? (
					<Typography
						type={"large"}
						className={"text-danger italic"}
					>
						Phòng đã đóng
					</Typography>
				) : (
					cookies.username && (
						<Button
							onClick={handleEnterRoom}
							isIconOnly={true}
							color={"secondary"}
							size={"xl"}
							startIcon={ICON_CONFIG.JOIN_ROOM}
						></Button>
					)
				)}
			</div>
		</div>
	);
};

export default RoomRow;
