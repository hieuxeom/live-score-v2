import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { IAPIResponse } from "../../types/general";
import { TRoomInfo, TGameCardSocketRoomCreated } from "../../types/game-card";
import API_ROUTES from "../../configs/api-routes.config";
import useSocket from "../../hooks/useSocket";
import Wrapper from "../../components/wrapper";
import Typography from "../../components/typography";
import Button from "../../components/button";
import ICON_CONFIG from "../../configs/icon.config";
import ROUTE_PATH from "../../configs/routes.config";
import RoomRow from "./components/room-row";
import SOCKET_EVENT_NAMES from "../../configs/socket-event-names.config";
import Checkbox from "../../components/checkbox";
import clsx from "clsx";
import useScreenSize from "../../hooks/useScreenSize";
import { BREAK_POINT } from "../../configs/break-points.config";
import CustomHelmet from "../../components/custom-helmet";

// interface CardGameProps {}

const CardGame = () => {
	const { width } = useScreenSize();
	const axios = useAxios();
	const socket = useSocket();

	const [cookies] = useCookies(["username", "user_id"]);

	const navigate = useNavigate();

	const [listRooms, setListRooms] = useState<TRoomInfo[]>([]);
	const [listRoomsRender, setListRoomsRender] = useState<TRoomInfo[]>([]);
	const [isShowClosedRoom, setIsShowClosedRoom] = useState<boolean>(false);
	const getListGameRooms = () => {
		return axios
			.get<IAPIResponse<TRoomInfo[]>>(API_ROUTES.GAME_CARD.GET_ALL_ROOMS)
			.then((response) => response.data)
			.then((response) => {
				setListRooms(response.results);
			});
	};

	useEffect(() => {
		getListGameRooms();
	}, []);

	useEffect(() => {
		socket.on(SOCKET_EVENT_NAMES.CREATE_NEW_ROOM.RECEIVE, (response: TGameCardSocketRoomCreated) => {
			return setListRooms(response.listRooms);
		});

		socket.on(SOCKET_EVENT_NAMES.CLOSE_ROOM.RECEIVE, (response: TGameCardSocketRoomCreated) => {
			return setListRooms(response.listRooms);
		});
	}, []);

	useEffect(() => {
		if (isShowClosedRoom) {
			setListRoomsRender(listRooms);
		} else {
			setListRoomsRender(listRooms.filter((room) => !room.is_closed));
		}
	}, [listRooms, isShowClosedRoom]);

	return (
		<>
			<CustomHelmet
				title={"Danh sách phòng"}
				description={"Danh sách phòng đánh bài"}
				keywords={["gamecard", "Gamecard", "game", "card", "rooms", "page"]}
			/>
			<Wrapper
				size={"full"}
				centerX={true}
				orientation={"vertical"}
				className={clsx("my-16 min-h-screen px-4", "xl:px-0", "lg:px-8")}
			>
				<div
					className={clsx(
						"w-full bg-white shadow-primary-1 rounded-2xl flex flex-col gap-4 p-4",
						"xl:w-3/4",
						"lg:p-8"
					)}
				>
					<div className={"flex md:justify-between md:flex-row flex-col  items-center gap-4"}>
						<div className={"flex items-center md:flex-row flex-col md:gap-2 gap-1"}>
							<Typography
								type={"h1"}
								className={"min-w-max text-center text-primary"}
							>
								Danh sách
							</Typography>
							<Typography
								type={"h1"}
								className={"min-w-max text-center text-secondary"}
							>
								Trận đấu
							</Typography>
						</div>
						{cookies.username && (
							<Button
								size={width >= BREAK_POINT.MD ? "lg" : "md"}
								startIcon={ICON_CONFIG.NEW}
								isDisabled={!cookies.username}
								onClick={() => navigate(ROUTE_PATH.CARD_GAME.CREATE_NEW_ROOM)}
							>
								Tạo phòng mới
							</Button>
						)}
					</div>
					<div className={"w-full flex items-center justify-end"}>
						<div
							className={clsx(
								"flex items-center text-center flex-col-reverse gap-4",
								"md:flex-row md:gap-0"
							)}
						>
							<div className={clsx("px-2 flex items-center", "md:border-r")}>
								<Checkbox
									value={isShowClosedRoom}
									onChange={(e) => setIsShowClosedRoom(e.target.checked)}
									name={"show-closed-room"}
								>
									Hiện phòng đã đóng
								</Checkbox>
							</div>
							<div className={"flex items-center text-center"}>
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
									<strong>{listRooms.filter((_r) => !_r.is_closed).length}</strong> đang hoạt động
								</Typography>
								<Typography
									type={"small"}
									className={"text-danger px-2"}
								>
									<strong>{listRooms.filter((_r) => _r.is_closed).length}</strong> đã đóng
								</Typography>
							</div>
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
		</>
	);
};

export default CardGame;
