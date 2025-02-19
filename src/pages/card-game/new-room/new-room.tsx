import { useNavigate } from "react-router";
import useSocket from "../../../hooks/useSocket";
import { useEffect, useState } from "react";
import ROUTE_PATH from "../../../configs/routes.config";
import Wrapper from "../../../components/wrapper";
import Typography from "../../../components/typography";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { useCookies } from "react-cookie";
import { TGameCardSocketRoomCreated } from "../../../types/game-card";
import toast from "react-hot-toast";
import SOCKET_EVENT_NAMES from "../../../configs/socket-event-names.config";

// interface NewRoomProps {}

const NewRoom = () => {
	const navigate = useNavigate();
	const socket = useSocket();

	const [cookies] = useCookies(["user_id"]);

	const [roomConfig, setRoomConfig] = useState({
		first: 4,
		second: 2,
		third: -2,
		fourth: -4,
		red_two: 4,
		black_two: 2,
		burnt_out: 8,
		swept_out: 4,
		player1_name: "Player 1",
		player2_name: "Player 2",
		player3_name: "Player 3",
		player4_name: "Player 4",
	});

	const handleCreateRoom = () => {
		socket.emit(SOCKET_EVENT_NAMES.CREATE_NEW_ROOM.SEND, {
			created_by: cookies.user_id,
			roomConfig,
		});
	};

	useEffect(() => {
		socket.on(SOCKET_EVENT_NAMES.CREATE_NEW_ROOM.RECEIVE, (response: TGameCardSocketRoomCreated) => {
			toast.success("Tạo phòng thành công");
			return navigate(ROUTE_PATH.CARD_GAME.GAME_ROOM(response.newRoomId));
		});
	}, []);

	return (
		<Wrapper
			size={"screen"}
			centerX
			orientation={"vertical"}
			className={"my-16"}
		>
			<div className={"w-3/4 bg-white p-8 shadow-primary-1 rounded-2xl flex flex-col gap-4"}>
				<Typography
					type={"h1"}
					className={"text-center text-secondary uppercase"}
				>
					Tạo phòng mới
				</Typography>
			</div>
			<div className={"w-3/4 grid grid-cols-3 gap-4"}>
				<div className={"w-full bg-white px-8 py-4 shadow-secondary-1 rounded-2xl flex flex-col gap-4"}>
					<Typography
						type={"h2"}
						className={"text-center text-secondary"}
					>
						Tùy chỉnh tên
					</Typography>
					<div className={"flex flex-col gap-2"}>
						<Input
							name={"player1_name"}
							label={"Tên người chơi 1"}
							labelPlacement={"top"}
							id={"player1Name"}
							value={roomConfig.player1_name}
							onChange={(e) => {
								setRoomConfig({ ...roomConfig, player1_name: e.target.value });
							}}
						/>
						<Input
							name={"player2_name"}
							label={"Tên người chơi 2"}
							labelPlacement={"top"}
							id={"player2Name"}
							value={roomConfig.player2_name}
							onChange={(e) => {
								setRoomConfig({ ...roomConfig, player2_name: e.target.value });
							}}
						/>
						<Input
							name={"player3_name"}
							label={"Tên người chơi 3"}
							labelPlacement={"top"}
							id={"player3Name"}
							value={roomConfig.player3_name}
							onChange={(e) => {
								setRoomConfig({ ...roomConfig, player3_name: e.target.value });
							}}
						/>
						<Input
							name={"player4_name"}
							label={"Tên người chơi 4"}
							labelPlacement={"top"}
							id={"player1Name"}
							value={roomConfig.player4_name}
							onChange={(e) => {
								setRoomConfig({ ...roomConfig, player4_name: e.target.value });
							}}
						/>
					</div>
				</div>
				<div
					className={
						"col-span-2 w-full bg-white px-8 py-4 shadow-secondary-1 rounded-2xl flex flex-col gap-2"
					}
				>
					<Typography
						type={"h2"}
						className={"text-center text-secondary"}
					>
						Cấu hình điểm
					</Typography>
					<div className={"w-full flex gap-4"}>
						<div className={"w-1/2 flex flex-col gap-2"}>
							<Input
								name={"first"}
								id={"firstPlacePoint"}
								label={"Nhất"}
								labelPlacement={"top"}
								onChange={(e) => {
									setRoomConfig({ ...roomConfig, first: Number(e.target.value) });
								}}
								value={roomConfig.first.toString()}
								endContent={
									<Typography
										type={"small"}
										className={"italic"}
									>
										điểm
									</Typography>
								}
							/>
							<Input
								id={"secondPlacePoint"}
								label={"Nhì"}
								labelPlacement={"top"}
								onChange={(e) => {
									setRoomConfig({ ...roomConfig, second: Number(e.target.value) });
								}}
								value={roomConfig.second.toString()}
								name={"second"}
								endContent={
									<Typography
										type={"small"}
										className={"italic"}
									>
										điểm
									</Typography>
								}
							/>
							<Input
								id={"thirdPlacePoint"}
								label={"Ba"}
								labelPlacement={"top"}
								onChange={(e) => {
									setRoomConfig({ ...roomConfig, third: Number(e.target.value) });
								}}
								value={roomConfig.third.toString()}
								name={"third"}
								endContent={
									<Typography
										type={"small"}
										className={"italic"}
									>
										điểm
									</Typography>
								}
							/>
							<Input
								id={"firstPlacePoint"}
								label={"Bét"}
								labelPlacement={"top"}
								onChange={(e) => {
									setRoomConfig({ ...roomConfig, fourth: Number(e.target.value) });
								}}
								value={roomConfig.fourth.toString()}
								name={"fourth"}
								endContent={
									<Typography
										type={"small"}
										className={"italic"}
									>
										điểm
									</Typography>
								}
							/>
						</div>
						<div className={"w-1/2 flex flex-col gap-2"}>
							<Input
								id={"firstPlacePoint"}
								label={"2 Đỏ"}
								labelPlacement={"top"}
								onChange={(e) => {
									setRoomConfig({ ...roomConfig, red_two: Number(e.target.value) });
								}}
								value={roomConfig.red_two.toString()}
								name={"red_two"}
								endContent={
									<Typography
										type={"small"}
										className={"italic"}
									>
										điểm
									</Typography>
								}
							/>
							<Input
								id={"secondPlacePoint"}
								label={"2 Đen"}
								labelPlacement={"top"}
								onChange={(e) => {
									setRoomConfig({ ...roomConfig, black_two: Number(e.target.value) });
								}}
								value={roomConfig.black_two.toString()}
								name={"black_two"}
								endContent={
									<Typography
										type={"small"}
										className={"italic"}
									>
										điểm
									</Typography>
								}
							/>
							<Input
								id={"thirdPlacePoint"}
								label={"Cháy 13 lá"}
								labelPlacement={"top"}
								onChange={(e) => {
									setRoomConfig({ ...roomConfig, burnt_out: Number(e.target.value) });
								}}
								value={roomConfig.burnt_out.toString()}
								name={"burnt_out"}
								endContent={
									<Typography
										type={"small"}
										className={"italic"}
									>
										điểm
									</Typography>
								}
							/>
							<Input
								id={"thirdPlacePoint"}
								label={"Thua tới trắng"}
								labelPlacement={"top"}
								onChange={(e) => {
									setRoomConfig({ ...roomConfig, swept_out: Number(e.target.value) });
								}}
								value={roomConfig.swept_out.toString()}
								name={"swept_out"}
								endContent={
									<Typography
										type={"small"}
										className={"italic"}
									>
										điểm
									</Typography>
								}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={"w-3/4"}>
				<Button
					size={"xl"}
					variant={"solid-3d"}
					fullWidth
					color={"primary"}
					onClick={() => handleCreateRoom()}
				>
					Tạo phòng
				</Button>
			</div>
		</Wrapper>
	);
};

export default NewRoom;
