import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/button";
import Divider from "../../../components/divider";
import Input from "../../../components/input";
import Radio from "../../../components/radio";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import API_ROUTES from "../../../configs/api-routes.config";
import useAxiosServer from "../../../hooks/useAxiosServer";
import { TEmailCheckResponse } from "../../../types/auth";
import { TBadmintonNewMatch, TBadmintonScoreFormat } from "../../../types/badminton";
import { IAPIResponse } from "../../../types/general";
import { sliceText } from "../../../utils/slice-text";

interface BadmintonNewRoomProps {}

const BadmintonNewRoom = ({}: BadmintonNewRoomProps) => {
	const axios = useAxiosServer();

	const [matchInfo, setMatchInfo] = useState<TBadmintonNewMatch>({
		match_title: "",
		score_format: "15pts",
		max_time: 0,
		player1_name: "",
		player2_name: "",
		umpire_judge: "",
		service_judge: "",
	});

	const [umpireJudgeInfo, setUmpireJudgeInfo] = useState<TEmailCheckResponse>({
		isValid: true,
		emailInfo: {
			email: "",
			username: "",
		},
	});
	const [serviceJudgeInfo, setServiceJudgeInfo] = useState<TEmailCheckResponse>({
		isValid: true,
		emailInfo: {
			email: "",
			username: "",
		},
	});

	const matchRules = [
		{
			title: "Thể thức 15 điểm",
			content:
				"Mỗi ván đấu kết thúc khi một bên đạt 15 điểm trước. Nếu tỷ số hòa 14-14, bên nào chạm 14 trước có quyền chọn chơi đến 15 hoặc 17 điểm.",
		},

		{
			title: "Thể thức 31 điểm",
			content:
				"Trận đấu chỉ có một ván duy nhất, bên nào đạt 31 điểm trước sẽ giành chiến thắng mà không cần cách biệt 2 điểm.Trận đấu chỉ có một ván duy nhất, bên nào đạt 31 điểm trước sẽ giành chiến thắng mà không cần cách biệt 2 điểm.",
		},
		{
			title: "Thể thức 21 điểm (Best of 1 - BO1)",
			content:
				"Trận đấu chỉ diễn ra trong một ván duy nhất, đội hoặc tay vợt nào đạt 21 điểm trước (và hơn đối thủ ít nhất 2 điểm) sẽ giành chiến thắng.",
		},
		{
			title: "Thể thức 21 điểm (Best of 3 - BO3)",
			content:
				"Trận đấu diễn ra theo thể thức 3 ván thắng 2. Mỗi ván kết thúc khi một bên đạt 21 điểm và hơn đối thủ ít nhất 2 điểm. Nếu tỷ số hòa 20-20, ván đấu tiếp tục cho đến khi có đội dẫn trước 2 điểm hoặc chạm mốc 30 điểm trước.",
		},

		{
			title: "Thể thức tính theo thời gian",
			content:
				"Trận đấu được giới hạn thời gian, bên nào có nhiều điểm hơn khi hết thời gian quy định sẽ giành chiến thắng. Nếu hai bên hòa điểm khi hết giờ, có thể áp dụng các quy tắc phụ để xác định người thắng.",
		},
	];

	const scoreFormat = [
		{
			value: "15pts",
			text: "15 điểm",
		},
		{
			value: "31pts",
			text: "31 điểm",
		},
		{
			value: "21pts_bo1",
			text: "21 điểm - BO1",
		},
		{
			value: "21pts_bo3",
			text: "21 điểm - BO3",
		},

		{
			value: "timer",
			text: "Tính thời gian",
		},
	];

	const handleCheckJudgeEmailValid = (judge: "umpire" | "service", email: string) => {
		if (email === "") {
			if (judge === "umpire") {
				setUmpireJudgeInfo({
					isValid: false,
					emailInfo: {
						email: "",
						username: "",
					},
				});
			} else {
				setServiceJudgeInfo({
					isValid: false,
					emailInfo: {
						email: "",
						username: "",
					},
				});
			}
			return;
		}

		return axios
			.get<IAPIResponse<TEmailCheckResponse>>(API_ROUTES.ACCOUNT.EMAIL_CHECK, {
				params: {
					email,
				},
			})
			.then((response) => response.data)
			.then((response) => {
				if (judge === "umpire") {
					setUmpireJudgeInfo(response.results);
				} else {
					setServiceJudgeInfo(response.results);
				}
			});
	};

	const handleCreateNewMatch = () => {
		const myFn = axios
			.post<IAPIResponse<{ newMatchId: string | number }>>(API_ROUTES.BADMINTON.CREATE_MATCH, matchInfo)
			.then((response) => response.data)
			.then((response) => {
				if (response.status === "success") {
					toast.success(`Tạo phòng thành công ${response.results.newMatchId}`);
					// navigate(ROUTE_PATH.BADMINTON.ROOM(response.results.room_id));
				}
			});

		toast.promise(myFn, {
			loading: "Đang tạo phòng...",
			success: "Tạo phòng thành công",
			error: "(error) => error.response.data.message",
		});
	};

	const validNewMatchInfo = () => {
		const hasEmptyField = Object.values(matchInfo).some(
			(value) => value === "" || value === null || value === undefined
		);

		if (hasEmptyField) {
			return false;
		}

		if (!umpireJudgeInfo.isValid || !serviceJudgeInfo.isValid) {
			return false;
		}

		return true;
	};

	return (
		<Wrapper
			size={"screen"}
			centerX={true}
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
			<div className={"w-3/4 gap-4"}>
				<div className={"w-full rounded-2xl shadow-primary-1 p-4 bg-white flex flex-col gap-4"}>
					<Typography
						type={"h2"}
						className={"text-secondary"}
					>
						Thông tin trận đấu
					</Typography>
					<div className={"flex flex-col item-start gap-4"}>
						<Input
							label={"Tên trận đấu"}
							labelPlacement={"top"}
							value={matchInfo.match_title}
							onChange={(e) => setMatchInfo({ ...matchInfo, match_title: e.target.value })}
							name={"match_name"}
						/>
						<div className={"w-full flex items-start gap-8"}>
							<div className={"w-2/3 flex flex-col gap-2"}>
								<div className={"flex flex-col gap-1"}>
									<Typography>Thể thức tính điểm</Typography>
									<div className={"w-max grid grid-cols-2 gap-x-4"}>
										{scoreFormat.map((_v) => (
											<Radio
												onSelected={() =>
													setMatchInfo({
														...matchInfo,
														score_format: _v.value as TBadmintonScoreFormat,
													})
												}
												value={_v.value}
												name={"score_format"}
												textValue={_v.text}
												isChecked={_v.value === matchInfo.score_format}
											/>
										))}
									</div>
								</div>
								{matchInfo.score_format === "timer" && (
									<div className={"flex flex-col gap-1"}>
										<Typography>Thời gian trận đấu</Typography>
										<div>
											<Input
												type={"number"}
												value={matchInfo.max_time.toString()}
												// label={"Thời gian trận đấu"}
												name={"match_time"}
												endContent={"phút"}
												onChange={(e) =>
													setMatchInfo({
														...matchInfo,
														max_time: e.target.value ? parseInt(e.target.value) : 0,
													})
												}
												classNames={{ input: "!w-28" }}
											/>
										</div>
									</div>
								)}
								<Divider />
								<div className={"flex flex-col gap-4"}>
									<Typography
										type={"h2"}
										className={"text-secondary"}
									>
										Thông tin người chơi
									</Typography>
									<div className={"flex items-center gap-2"}>
										<Input
											label={"Người chơi 1"}
											labelPlacement={"top"}
											value={matchInfo.player1_name}
											onChange={(e) =>
												setMatchInfo({ ...matchInfo, player1_name: e.target.value })
											}
											name={"match_name"}
										/>
										<Input
											label={"Người chơi 2"}
											labelPlacement={"top"}
											value={matchInfo.player2_name}
											onChange={(e) =>
												setMatchInfo({ ...matchInfo, player2_name: e.target.value })
											}
											name={"match_name"}
										/>
									</div>
								</div>
								<Divider />
								<div className={"flex flex-col gap-4"}>
									<Typography
										type={"h2"}
										className={"text-secondary"}
									>
										Thông tin trọng tài
									</Typography>
									<div className={"flex items-center gap-2"}>
										<Input
											label={"Trọng tài chính"}
											labelPlacement={"top"}
											value={matchInfo.umpire_judge}
											onChange={(e) =>
												setMatchInfo({ ...matchInfo, umpire_judge: e.target.value })
											}
											onBlur={() => handleCheckJudgeEmailValid("umpire", matchInfo.umpire_judge)}
											isError={matchInfo.umpire_judge !== "" && !umpireJudgeInfo.isValid}
											errorMessage={"Email không tồn tại"}
											name={"umpire_judge"}
											endContent={sliceText(umpireJudgeInfo.emailInfo.username, 8) || "-"}
										/>
										<Input
											label={"Trọng tài phụ"}
											labelPlacement={"top"}
											value={matchInfo.service_judge}
											onChange={(e) =>
												setMatchInfo({ ...matchInfo, service_judge: e.target.value })
											}
											onBlur={() =>
												handleCheckJudgeEmailValid("service", matchInfo.service_judge)
											}
											isError={matchInfo.service_judge !== "" && !serviceJudgeInfo.isValid}
											errorMessage={"Email không tồn tại"}
											name={"service_judge"}
											endContent={sliceText(serviceJudgeInfo.emailInfo.username, 8) || "-"}
										/>
									</div>
								</div>
								<div className={"py-4"}>
									<Button
										variant={"solid-3d"}
										color={"primary"}
										size={"lg"}
										fullWidth
										isDisabled={!validNewMatchInfo()}
										onClick={handleCreateNewMatch}
									>
										Tạo trận đấu
									</Button>
								</div>
							</div>
							<div className={"w-1/2 flex flex-col gap-4"}>
								{matchRules.map((_v) => (
									<div className={"flex flex-col gap-.5"}>
										<Typography
											type={"p"}
											className={"font-bold"}
										>
											* {_v.title}
										</Typography>
										<Typography type={"p"}>{_v.content}</Typography>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default BadmintonNewRoom;
