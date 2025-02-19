import { useCookies } from "react-cookie";
import Button from "../../components/button";
import Checkbox from "../../components/checkbox";
import Typography from "../../components/typography";
import Wrapper from "../../components/wrapper/wrapper";
import ICON_CONFIG from "../../configs/icon.config";
import ROUTE_PATH from "../../configs/routes.config";
import RoomRow from "../card-game/components/room-row";
import { useNavigate } from "react-router";
import { useState } from "react";
interface BadmintonProps {}

const Badminton = (props: BadmintonProps) => {
	const [cookies] = useCookies(["username", "user_id"]);

	const [isShowClosedRoom, setIsShowClosedRoom] = useState<boolean>(false);
	const [listRooms, setListRooms] = useState([]);
	const [listRoomsRender, setListRoomsRender] = useState([]);

	const navigate = useNavigate();

	return (
		<Wrapper
			size={"screen"}
			centerX={true}
			orientation={"vertical"}
			className={"my-16"}
		>
			<div className={"w-3/4 bg-white p-8 shadow-primary-1 rounded-2xl flex flex-col gap-4"}>
				<div className={"flex justify-between items-center gap-4"}>
					<div className={"flex items-center gap-2"}>
						<Typography
							type={"h1"}
							className={" text-center text-primary"}
						>
							Danh sách
						</Typography>
						<Typography
							type={"h1"}
							className={" text-center text-secondary"}
						>
							Trận đấu
						</Typography>
					</div>
					{cookies.username && (
						<Button
							size={"lg"}
							startIcon={ICON_CONFIG.NEW}
							isDisabled={!cookies.username}
							onClick={() => navigate(ROUTE_PATH.BADMINTON.CREATE_NEW_ROOM)}
						>
							Tạo phòng mới
						</Button>
					)}
				</div>
				<div className={"w-full flex items-center justify-end"}>
					<div className={"flex items-center text-center"}>
						<div className={"border-r px-2 flex items-center"}>
							<Checkbox
								value={isShowClosedRoom}
								onChange={(e) => setIsShowClosedRoom(e.target.checked)}
								name={"show-closed-room"}
							>
								Hiện phòng đã đóng
							</Checkbox>
						</div>
						<Typography
							type={"small"}
							className={"text-secondary px-2 border-r border-dark"}
						>
							<strong>{listRooms.length}</strong> đã được tạo
						</Typography>
						<Typography
							type={"small"}
							className={"text-success px-2 border-r border-dark"}
						>
							{/* <strong>{listRooms.filter((_r) => !_r.is_closed).length}</strong> đang hoạt động */} x
						</Typography>
						<Typography
							type={"small"}
							className={"text-danger px-2"}
						>
							{/* <strong>{listRooms.filter((_r) => _r.is_closed).length}</strong> đã đóng */}x
						</Typography>
					</div>
				</div>
				<Wrapper
					size={"full"}
					orientation={"vertical"}
					gapSize={2}
					className={
						"rounded-2xl scrollable-content overflow-y-scroll max-h-[75vh] bg-scroll-box bg-[position:bottom_center,top_center,bottom_center,top_center] bg-[size:100%_40px,100%_40px,100%_40px,100%_40px] bg-no-repeat"
					}
					style={{
						backgroundAttachment: "local, local, scroll, scroll",
					}}
				>
					{listRoomsRender.map((room) => (
						<RoomRow
							roomInfo={room}
							key={room.room_id}
						/>
					))}
				</Wrapper>
			</div>
		</Wrapper>
	);
};

export default Badminton;
