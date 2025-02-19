import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import Button from "../../../components/button";
import Input from "../../../components/input";
import Loading from "../../../components/loading";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import API_ROUTES from "../../../configs/api-routes.config";
import ICON_CONFIG from "../../../configs/icon.config";
import useAxiosServer from "../../../hooks/useAxiosServer";
import { TBadmintonMatchInfo } from "../../../types/badminton";
import { IAPIResponse } from "../../../types/general";
import ScoreBlock from "../components/score-block";
import TimerBlock from "../components/timer-block";

interface BadmintonGameRoomProps {}

const BadmintonGameRoom = ({}: BadmintonGameRoomProps) => {
	const { roomId } = useParams();

	const [matchInfo, setMatchInfo] = useState<TBadmintonMatchInfo>();

	// const [matchResults, setMatchResults] = useState({
	// 	player1_score: 0,
	// 	player2_score: 0,
	// });

	// const [currentInRoom, setCurrentInRoom] = useState(0);

	const [cookies] = useCookies(["username", "user_id"]);

	const axios = useAxiosServer();

	const getMatchInfo = (roomId: string | number) => {
		const myFn = axios
			.get<IAPIResponse<TBadmintonMatchInfo>>(API_ROUTES.BADMINTON.GET_MATCH_INFO(roomId))
			.then((response) => response.data)
			.then((response) => {
				setMatchInfo(response.results);
			});

		toast.promise(myFn, {
			loading: "Đang tải thông tin trận đấu...",
			success: "Tải thông tin trận đấu thành công",
			error: "Tải thông tin trận đấu thất bại",
		});
	};

	useEffect(() => {
		if (!roomId) return;

		// setCurrentInRoom(0);
		getMatchInfo(roomId);
	}, []);

	return (
		<Wrapper
			size={"screen"}
			centerX={true}
			orientation={"vertical"}
			className={"my-16"}
		>
			{!matchInfo ? (
				<div className={"w-3/4 bg-white p-8 shadow-primary-1 rounded-2xl flex justify-center gap-4"}>
					<Loading
						size={"xl"}
						color={"primary"}
					/>
				</div>
			) : (
				<>
					<div className={"w-3/4 bg-white p-8 shadow-primary-1 rounded-2xl flex flex-col gap-4"}>
						<div className={"flex justify-between items-start"}>
							<div className={"flex flex-col gap-2"}>
								<div className={"flex items-center gap-2"}>
									<Typography
										type={"h1"}
										className={"text-center text-primary"}
									>
										{matchInfo.match_title || "-"}
									</Typography>
								</div>
								<div className={"flex items-center gap-2"}>
									<Typography
										type={"small"}
										className={"italic"}
									>
										Thể thức tính điểm: <strong className={"text-primary"}>15 điểm</strong>
									</Typography>
									<Typography
										type={"muted"}
										className={"italic"}
									>
										|
									</Typography>
									<Typography
										type={"muted"}
										className={"italic"}
									>
										Tạo bởi {matchInfo.username}
									</Typography>
								</div>
							</div>
							<div className={"flex items-center gap-4"}>
								<Typography type={"large"}>
									<strong className={"text-primary"}>0</strong> trong phòng
								</Typography>
								{matchInfo.is_closed ? (
									<Typography
										type={"large"}
										className={"text-danger italic px-4"}
									>
										Phòng đã bị đóng
									</Typography>
								) : (
									cookies.user_id === matchInfo.created_by && (
										<Button
											size={"lg"}
											color={"danger"}
											variant={"solid-3d"}
											// onClick={() => handleCloseRoom()}
											startIcon={ICON_CONFIG.CLOSE_ROOM}
										>
											Đóng phòng
										</Button>
									)
								)}
								<Button
									size={"lg"}
									color={"secondary"}
									variant={"solid-3d"}
									// onClick={handleLeaveRoom}
									endIcon={ICON_CONFIG.LEAVE_ROOM}
								>
									Thoát
								</Button>
							</div>
						</div>
					</div>
					<div
						className={
							"w-3/4 h-full min-h-[80vh] flex flex-col gap-8 bg-white p-4 shadow-primary-1 rounded-3xl"
						}
					>
						<div className={"w-full flex justify-between gap-8"}>
							<Typography
								type={"h2"}
								className={"w-full text-center"}
							>
								{matchInfo.player1_name}
							</Typography>
							<Typography
								type={"h2"}
								className={"text-center"}
							>
								-
							</Typography>
							<Typography
								type={"h2"}
								className={"w-full text-center"}
							>
								{matchInfo.player2_name}
							</Typography>
						</div>
						<div className={"flex items-center gap-8 h-full"}>
							<div className={"w-full flex flex-col items-center gap-8"}>
								<ScoreBlock
									side={"left"}
									score={1}
								/>
							</div>
							<TimerBlock
								hideHour
								minute={"24"}
								second={"01"}
							/>
							<div className={"w-full flex flex-col items-center gap-8"}>
								<ScoreBlock
									side={"left"}
									score={1}
								/>
							</div>
						</div>

						<div className={"w-full flex justify-center"}>
							<div className={"w-1/2 flex items-center gap-4"}>
								<Input
									isDisabled
									label={"Trọng tài chính"}
									value={"Trần Ngọc Hiếu"}
									name={"umpire_judge"}
									classNames={{
										label: "text-center",
										input: "text-center",
									}}
								/>

								<Input
									isDisabled
									label={"Trọng tài phụ"}
									value={"Trần Ngọc Hiếu"}
									name={"service_judge"}
									classNames={{
										label: "text-center",
										input: "text-center",
									}}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</Wrapper>
	);
};

export default BadmintonGameRoom;
