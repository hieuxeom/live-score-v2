import { useCookies } from "react-cookie";
import useSocket from "../../../hooks/useSocket";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import {
	TRoomInfo,
	TRoomResults,
	TSocketPlayerChange,
	TSocketNewResult,
	TSocketUpdatedRoomConfig,
	TSocketDeleteResult,
} from "../../../types/cardgame";
import { IAPIResponse } from "../../../types/general";
import API_ROUTES from "../../../configs/api-routes.config";
import ROUTE_PATH from "../../../configs/routes.config";
import toast from "react-hot-toast";
import Wrapper from "../../../components/wrapper";
import Typography from "../../../components/typography";
import Button from "../../../components/button";
import ICON_CONFIG from "../../../configs/icon.config";
import MatchConfig from "../components/match-config";
import Loading from "../../../components/loading";
import RoomScoreBoard from "../components/room-score-board";
import PlayHistoryTable from "../components/play-history-table";
import ModalAddResult from "../components/modal-add-result";
import PlayerInRoom from "../components/player-in-room";
import SOCKET_EVENT_NAME from "../../../configs/socket-evname.config";

// interface GameRoomProps {}

const GameRoom = () => {
	const socket = useSocket();

	const [cookies] = useCookies(["email"]);

	const { roomId } = useParams();

	const axios = useAxios();
	const navigate = useNavigate();

	const [isShowModal, setIsShowModal] = useState<boolean>(false);
	const [currentInRoom, setCurrentInRoom] = useState<number>(0);

	const [roomInfo, setRoomInfo] = useState<TRoomInfo>();

	const [roomResults, setRoomResults] = useState<TRoomResults>();
	const [playersInRoom, setPlayersInRoom] = useState<string[]>([]);

	const getRoomInfo = () => {
		if (!roomId) return;

		return axios
			.get<IAPIResponse<TRoomInfo>>(API_ROUTES.GAME_CARD.GET_ROOM_DETAILS(roomId))
			.then((response) => response.data)
			.then((response) => {
				setRoomInfo(response.results);
			});
	};

	const getRoomResults = () => {
		if (!roomId) return;

		return axios
			.get<IAPIResponse<TRoomResults>>(API_ROUTES.GAME_CARD.GET_ROOM_RESULTS(roomId))
			.then((response) => response.data)
			.then((response) => {
				setRoomResults(response.results);
			});
	};

	const handleCloseRoom = () => {
		if (!roomId) return;

		return axios
			.patch<IAPIResponse>(API_ROUTES.GAME_CARD.CLOSE_ROOM(roomId))
			.then((response) => response.data)
			.then((response) => {
				if (response.status === "success") {
					getRoomInfo();
				}
			});
	};

	const handleLeaveRoom = () => {
		socket.emit(SOCKET_EVENT_NAME.LEAVE_CARDGAME_ROOM, { roomId, email: cookies.email });
		navigate(ROUTE_PATH.CARD_GAME.INDEX);
	};

	useEffect(() => {
		Promise.all([getRoomInfo(), getRoomResults()]).then(() => {});

		socket.emit(SOCKET_EVENT_NAME.JOIN_CARDGAME_ROOM, { roomId, email: cookies.email });

		socket.on(SOCKET_EVENT_NAME.PLAYER_CHANGE, (data: TSocketPlayerChange) => {
			setCurrentInRoom(data.currentInRoom);
			setPlayersInRoom(data.playersInRoom);
		});

		socket.on(SOCKET_EVENT_NAME.CREATE_RESULT.RECEIVE, (response: TSocketNewResult) => {
			toast.success(`${response.createdBy} vừa thêm kết quả mới`);
			setRoomResults(response.roomResults);
			setIsShowModal(false);
		});

		socket.on(SOCKET_EVENT_NAME.UPDATE_ROOM_CONFIG.RECEIVE, (response: TSocketUpdatedRoomConfig) => {
			toast.success(`${response.updatedBy} vừa cập nhật cấu hình điểm`);
			setRoomInfo(response.roomDetails);
			getRoomResults();
		});

		socket.on(SOCKET_EVENT_NAME.DELETE_MATCH_RESULTS.RECEIVE, (response: TSocketDeleteResult) => {
			toast.success(`${response.deleteBy} vừa xóa kết quả`);
			setRoomResults(response.roomResults);
		});
	}, []);

	useEffect(() => {
		if (!cookies.email) {
			toast.error("Vui lòng đăng nhập để tham gia phòng");
			navigate(ROUTE_PATH.CARD_GAME.INDEX);
		}
	}, [cookies]);

	return (
		<Wrapper
			size={"screen"}
			centerX={true}
			orientation={"vertical"}
			className={"my-16"}
		>
			{!roomInfo ? (
				<Loading />
			) : (
				<>
					<div className={"w-3/4 bg-white p-8 shadow-primary-1 rounded-2xl flex flex-col gap-4"}>
						<div className={"flex justify-between items-start"}>
							<div className={"flex flex-col gap-2"}>
								<div className={"flex items-center gap-2"}>
									<Typography
										type={"h1"}
										className={"text-center text-secondary"}
									>
										Phòng
									</Typography>
									<Typography
										type={"h1"}
										className={"text-center text-primary"}
									>
										#{roomId}
									</Typography>
								</div>
								<Typography
									type={"muted"}
									className={"italic"}
								>
									Tạo bởi {roomInfo.email}
								</Typography>
							</div>
							<div className={"flex items-center gap-2"}>
								<Typography type={"large"}>
									<strong className={"text-primary"}>{currentInRoom}</strong> trong phòng
								</Typography>
								{roomInfo.is_closed ? (
									<Typography
										type={"large"}
										className={"text-danger italic px-4"}
									>
										Phòng đã bị đóng
									</Typography>
								) : (
									<Button
										size={"lg"}
										color={"danger"}
										onClick={() => handleCloseRoom()}
										startIcon={ICON_CONFIG.CLOSE_ROOM}
									>
										Đóng phòng
									</Button>
								)}
								<Button
									size={"lg"}
									color={"secondary"}
									onClick={handleLeaveRoom}
									endIcon={ICON_CONFIG.LEAVE_ROOM}
								>
									Thoát
								</Button>
							</div>
						</div>
					</div>
					<div className={"w-3/4 grid grid-cols-3 gap-4"}>
						{!roomResults ? (
							<div>Loading...</div>
						) : (
							<>
								<PlayHistoryTable
									roomInfo={roomInfo}
									playHistory={roomResults.playHistory}
									historyScoreBoard={roomResults.historyScoreBoard}
								/>
								<div className={"flex flex-col gap-4"}>
									<div className={"w-full h-[10vh] bg-light p-4 rounded-2xl shadow-primary-1"}>
										<Button
											fullWidth
											variant={"solid-3d"}
											color={"primary"}
											startIcon={ICON_CONFIG.NEW}
											size={"lg"}
											onClick={() => setIsShowModal(true)}
											isDisabled={roomInfo.is_closed === 1}
										>
											Thêm kết quả mới
										</Button>
									</div>
									<div
										className={
											"bg-white p-8 shadow-primary-1 rounded-2xl col-span-1 w-full h-[35vh] flex flex-col gap-2"
										}
									>
										<RoomScoreBoard scoreBoard={roomResults.scoreBoard} />
									</div>
									<div
										className={
											"bg-white p-8 shadow-primary-1 rounded-2xl col-span-1 w-full h-[calc(70vh-35vh-10vh-2rem)] overflow-hidden flex flex-col gap-2"
										}
									>
										<PlayerInRoom playersInRoom={playersInRoom} />
									</div>
								</div>
							</>
						)}
					</div>
					<div className={"w-3/4 gap-4"}>
						<MatchConfig
							roomDetails={roomInfo}
							onChangeConfig={setRoomInfo}
						/>
					</div>
					<ModalAddResult
						isShowModal={isShowModal}
						setIsShowModal={setIsShowModal}
						matchHistory={roomResults?.playHistory.matchResults || []}
						roomDetails={roomInfo}
					/>
				</>
			)}
		</Wrapper>
	);
};

export default GameRoom;
