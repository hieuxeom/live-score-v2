import { useEffect } from "react";
import Input from "../../../../components/input/input";
import Typography from "../../../../components/typography";
import { TRoomInfo, TSocketUpdatedRoomConfig } from "../../../../types/cardgame";

import Button from "../../../../components/button";
import useSocket from "../../../../hooks/useSocket";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import SOCKET_EVENT_NAME from "../../../../configs/socket-evname.config";

interface MatchConfigProps {
	roomDetails: TRoomInfo;
	onChangeConfig: (value: any) => void;
}

const MatchConfig = ({ roomDetails, onChangeConfig }: MatchConfigProps) => {
	const { roomId } = useParams();

	const [cookies] = useCookies(["email", "user_id"]);

	const socket = useSocket();

	const handleSaveNewConfig = () => {
		console.log("roomConfigUpdated");

		socket.emit(SOCKET_EVENT_NAME.UPDATE_ROOM_CONFIG.SEND, {
			roomId,
			updatedBy: cookies.email,
			newConfig: {
				first: roomDetails.first,
				second: roomDetails.second,
				third: roomDetails.third,
				fourth: roomDetails.fourth,
				swept_out: roomDetails.swept_out,
				burnt_out: roomDetails.burnt_out,
				black_two: roomDetails.black_two,
				red_two: roomDetails.red_two,
			},
		});
	};

	useEffect(() => {
		socket.on(SOCKET_EVENT_NAME.UPDATE_ROOM_CONFIG.RECEIVE, (response: TSocketUpdatedRoomConfig) => {
			console.log("roomConfigUpdated", response);

			toast.success(`${response.updatedBy} vừa cập nhật cấu hình điểm`);
		});
	}, []);

	return (
		<div className={"w-full bg-white p-4 shadow-primary-1 rounded-2xl flex flex-col items-center gap-4"}>
			<Typography
				type={"h3"}
				className={"text-secondary"}
			>
				Cấu hình Điểm
			</Typography>
			<div className={"w-full flex items-center gap-8"}>
				<div className={"w-full grid grid-cols-4 gap-4"}>
					<Input
						id={"firstPlacePoint"}
						label={"Nhất"}
						labelPlacement={"left"}
						onChange={(e) =>
							onChangeConfig((prevState: TRoomInfo) => ({
								...prevState,
								first: !e ? 0 : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value),
							}))
						}
						value={roomDetails.first.toString()}
						name={"first"}
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
						labelPlacement={"left"}
						onChange={(e) =>
							onChangeConfig((prevState: TRoomInfo) => ({
								...prevState,
								second: !e ? 0 : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value),
							}))
						}
						value={roomDetails.second.toString()}
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
						labelPlacement={"left"}
						onChange={(e) =>
							onChangeConfig((prevState: TRoomInfo) => ({
								...prevState,
								third: !e ? 0 : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value),
							}))
						}
						value={roomDetails.third.toString()}
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
						labelPlacement={"left"}
						onChange={(e) =>
							onChangeConfig((prevState: TRoomInfo) => ({
								...prevState,
								fourth: !e ? 0 : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value),
							}))
						}
						value={roomDetails.fourth.toString()}
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
					<Input
						id={"firstPlacePoint"}
						label={"2 Đỏ"}
						labelPlacement={"left"}
						onChange={(e) =>
							onChangeConfig((prevState: TRoomInfo) => ({
								...prevState,
								red_two: !e ? 0 : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value),
							}))
						}
						value={roomDetails.red_two.toString()}
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
						labelPlacement={"left"}
						onChange={(e) =>
							onChangeConfig((prevState: TRoomInfo) => ({
								...prevState,
								black_two: !e ? 0 : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value),
							}))
						}
						value={roomDetails.black_two.toString()}
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
						labelPlacement={"left"}
						onChange={(e) =>
							onChangeConfig((prevState: TRoomInfo) => ({
								...prevState,
								burnt_out: !e ? 0 : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value),
							}))
						}
						value={roomDetails.burnt_out.toString()}
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
						id={"sweptOutPoint"}
						label={"Thua tới trắng"}
						labelPlacement={"left"}
						onChange={(e) =>
							onChangeConfig((prevState: TRoomInfo) => ({
								...prevState,
								swept_out: !e ? 0 : isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value),
							}))
						}
						value={roomDetails.swept_out.toString()}
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
			{roomDetails.created_by === cookies.user_id && (
				<Button
					variant={"solid-3d"}
					size={"md"}
					fullWidth
					color={"primary"}
					onClick={() => handleSaveNewConfig()}
					isDisabled={roomDetails.is_closed === 1}
				>
					Lưu
				</Button>
			)}
		</div>
	);
};

export default MatchConfig;
