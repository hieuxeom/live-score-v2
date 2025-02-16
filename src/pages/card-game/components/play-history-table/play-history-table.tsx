import { useState } from "react";
import { THistoryScoreBoard, TMatchHistory, TRoomInfo, TPlayHistory, TTwoPlayResult } from "../../../../types/cardgame";
import FirstPlaceMedal from "../../../../components/icon-svg/first-place-medal";
import BurnBlackTwo from "../../../../components/icon-svg/burn-black-two";
import BurnOut from "../../../../components/icon-svg/burn-out";
import BurnRedTwo from "../../../../components/icon-svg/burn-red-two";
import SecondPlaceMedal from "../../../../components/icon-svg/second-place-medal";
import SweptOut from "../../../../components/icon-svg/swept-out";
import TakeBlackTwo from "../../../../components/icon-svg/take-black-two";
import TakeRedTwo from "../../../../components/icon-svg/take-red-two";
import ThirdPlaceMedal from "../../../../components/icon-svg/third-place-medal";
import WinAllMedal from "../../../../components/icon-svg/win-all-medal";
import Typography from "../../../../components/typography";
import TableWrapper from "../../../../components/table/table-wrapper";
import TableBody from "../../../../components/table/table-body";
import TableCell from "../../../../components/table/table-cell";
import TableHeader from "../../../../components/table/table-header";
import TableRow from "../../../../components/table/table-row";
import Radio from "../../../../components/radio";
import { useCookies } from "react-cookie";
import Button from "../../../../components/button";
import ICON_CONFIG from "../../../../configs/icon.config";
import { useParams } from "react-router";
import useSocket from "../../../../hooks/useSocket";
import SOCKET_EVENT_NAMES from "../../../../configs/socket-event-names.config";

interface PlayHistoryTableProps {
	roomInfo: TRoomInfo;
	playHistory: TPlayHistory;
	historyScoreBoard: THistoryScoreBoard;
}

const PlayHistoryTable = ({ roomInfo, playHistory, historyScoreBoard }: PlayHistoryTableProps) => {
	const { roomId } = useParams();

	const [cookies] = useCookies(["username", "user_id"]);

	const socket = useSocket();

	const [displayType, setDisplayType] = useState<string>("icon");

	const { matchResults, twoPlayResults } = playHistory;

	const getMatchData = (playerId: number, matchIndex: number): TMatchHistory | null => {
		const matchData = matchResults.find((data) => data.player_index === playerId && data.match_id === matchIndex);
		if (!matchData) return null;

		return matchData;
	};

	const getTwoPlayResult = (playerId: number, matchIndex: number): TTwoPlayResult[] | [] => {
		const twoPlayResult = twoPlayResults.filter(
			(data) => (data.burner === playerId || data.taker === playerId) && data.match_id === matchIndex
		);
		if (!twoPlayResult) return [];

		return twoPlayResult;
	};

	const MapResultIcon = (matchData: TMatchHistory | null, twoPlayResult: TTwoPlayResult[]) => {
		const result = [];

		if (matchData === null) {
			return "-";
		}

		switch (matchData.rank) {
			case 1:
				if (!matchData.win_all) {
					result.push(<FirstPlaceMedal />);
				}
				break;
			case 2:
				result.push(<SecondPlaceMedal />);
				break;
			case 3:
				result.push(<ThirdPlaceMedal />);
				break;
		}

		if (matchData.win_all) {
			result.push(<WinAllMedal />);
		}
		if (matchData.burnt_out) {
			result.push(<BurnOut />);
		}
		if (matchData.swept_out) {
			result.push(<SweptOut />);
		}

		twoPlayResult.forEach((data) => {
			const quantityArray = Array.from({ length: data.quantity });

			quantityArray.forEach((_) => {
				if (data.burner === matchData.player_index) {
					result.push(data.two_color === "red" ? <BurnRedTwo /> : <BurnBlackTwo />);
				}

				if (data.taker === matchData.player_index) {
					result.push(data.two_color === "red" ? <TakeRedTwo /> : <TakeBlackTwo />);
				}
			});
		});

		return result;
	};

	const handleDeleteResults = (matchId: string | number) => {
		socket.emit(SOCKET_EVENT_NAMES.DELETE_MATCH_RESULTS.SEND, {
			deleteBy: cookies.username,
			roomId,
			matchId,
		});
	};

	return (
		<div
			className={
				"bg-white p-8 shadow-primary-1 rounded-2xl col-span-2 w-full flex flex-col gap-4 h-full max-h-[70vh]"
			}
		>
			<div className={"flex items-end justify-between"}>
				<Typography
					type={"h3"}
					className={"text-secondary inline-block"}
				>
					Lịch sử chơi
				</Typography>
				<div className={"flex items-center gap-4"}>
					<div className={"flex items-center gap-1 italic"}>
						<Typography
							type="h5"
							className={"text-secondary"}
						>
							Đã chơi
						</Typography>

						<Typography
							type="h5"
							className={"text-primary"}
						>
							{matchResults.length / 4 || 0}
						</Typography>
						<Typography
							type="h5"
							className={"text-secondary"}
						>
							ván
						</Typography>
					</div>
					<div className={"flex items-center gap-2"}>
						{/* {MatchHistoryDisplayType.map((item) => ( */}
						<Radio
							textValue={"Biểu tượng"}
							value={"icon"}
							name={"display-type"}
							isDisabled={false}
							isChecked={displayType === "icon"}
							color={"default"}
							onSelected={(e) => setDisplayType(e.target.value)}
						/>
						<Radio
							textValue={"Điểm số"}
							value={"score"}
							name={"display-type"}
							isDisabled={false}
							isChecked={displayType === "score"}
							color={"default"}
							onSelected={(e) => setDisplayType(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div
				className={
					"scrollable-content h-full bg-scroll-box bg-[position:bottom_center,top_center,bottom_center,top_center] bg-[size:100%_20px,100%_20px,100%_20px,100%_20px] bg-no-repeat"
				}
				style={{
					backgroundAttachment: "local, local, scroll, scroll",
				}}
			>
				<TableWrapper className={"border-2 border-primary border-collapse w-full"}>
					<TableHeader>
						<TableRow>
							<TableCell
								isHeader
								borderType={"full"}
								className={"w-1/5 border-primary"}
							>
								<Typography
									type={"h4"}
									className={"font-bold text-secondary"}
								>
									-
								</Typography>
							</TableCell>
							<TableCell
								isHeader
								className={"w-1/5 border-primary "}
								borderType={"full"}
							>
								<Typography
									type={"h4"}
									className={"font-bold text-secondary"}
								>
									{roomInfo.player1_name}
								</Typography>
							</TableCell>
							<TableCell
								isHeader
								borderType={"full"}
								className={"w-1/5 border-primary"}
							>
								<Typography
									type={"h4"}
									className={"font-bold text-secondary"}
								>
									{roomInfo.player2_name}
								</Typography>
							</TableCell>
							<TableCell
								isHeader
								borderType={"full"}
								className={"w-1/5 border-primary"}
							>
								<Typography
									type={"h4"}
									className={"font-bold text-secondary"}
								>
									{roomInfo.player3_name}
								</Typography>
							</TableCell>
							<TableCell
								isHeader
								borderType={"full"}
								className={"w-1/5 border-primary"}
							>
								<Typography
									type={"h4"}
									className={"font-bold text-secondary"}
								>
									{roomInfo.player4_name}
								</Typography>
							</TableCell>
						</TableRow>
					</TableHeader>

					<TableBody
						className={""}
						emptyMessage={"Chưa chơi trận nào"}
					>
						{Array.from(new Set(matchResults.map((item) => item.match_id))).map((matchId, index) => (
							<TableRow key={index}>
								<TableCell
									borderType={"full"}
									className={"text-center border-primary relative"}
								>
									Ván {matchId}
									{roomInfo.created_by === cookies.user_id && (
										<Button
											isIconOnly
											size={"lg"}
											startIcon={ICON_CONFIG.CLOSE}
											variant={"light"}
											color={"danger"}
											className={"absolute top-1/2 left-2 -translate-y-1/2"}
											onClick={() => handleDeleteResults(matchId)}
										/>
									)}
								</TableCell>
								<TableCell
									borderType={"full"}
									className={"text-center border-primary h-16"}
								>
									<div className={"flex items-center gap-0.5 justify-center"}>
										{displayType === "icon"
											? MapResultIcon(getMatchData(1, matchId), getTwoPlayResult(1, matchId))
											: historyScoreBoard[index][0]}
									</div>
								</TableCell>
								<TableCell
									borderType={"full"}
									className={"text-center border-primary h-16"}
								>
									<div className={"flex items-center gap-0.5 justify-center"}>
										{displayType === "icon"
											? MapResultIcon(getMatchData(2, matchId), getTwoPlayResult(2, matchId))
											: historyScoreBoard[index][1]}
									</div>
								</TableCell>
								<TableCell
									borderType={"full"}
									className={"text-center border-primary h-16"}
								>
									<div className={"flex items-center gap-0.5 justify-center"}>
										{displayType === "icon"
											? MapResultIcon(getMatchData(3, matchId), getTwoPlayResult(3, matchId))
											: historyScoreBoard[index][2]}
									</div>
								</TableCell>
								<TableCell
									borderType={"full"}
									className={"text-center border-primary h-16"}
								>
									<div className={"flex items-center gap-0.5 justify-center"}>
										{displayType === "icon"
											? MapResultIcon(getMatchData(4, matchId), getTwoPlayResult(4, matchId))
											: historyScoreBoard[index][3]}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TableWrapper>
			</div>
		</div>
	);
};

PlayHistoryTable.defaultProps = {};

export default PlayHistoryTable;
