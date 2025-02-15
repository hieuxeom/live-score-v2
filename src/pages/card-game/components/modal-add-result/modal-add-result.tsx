import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router";
import Button from "../../../../components/button";
import Typography from "../../../../components/typography";
import useSocket from "../../../../hooks/useSocket";
import { TMatchHistory, TPostPlayerResult, TRoomInfo, TTwoPlayResult } from "../../../../types/cardgame";
import PlayerResultRow from "../player-result-row";
import ModalWrapper from "../../../../components/modal-wrapper";
import RESULT_DRAG_ITEMS from "../drag-items";
import ICON_CONFIG from "../../../../configs/icon.config";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import SOCKET_EVENT_NAME from "../../../../configs/socket-evname.config";

interface ModalAddResultProps {
	isShowModal: boolean;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	matchHistory: TMatchHistory[];
	roomDetails: TRoomInfo;
}

const ModalAddResult = ({ isShowModal, setIsShowModal, matchHistory, roomDetails }: ModalAddResultProps) => {
	const { roomId } = useParams();

	const [cookies] = useCookies(["email"]);

	const socket = useSocket();

	const createStatusToast = useRef<any>(null);

	const [player1DragValue, setPlayer1DragValue] = useState<string[]>([]);
	const [player2DragValue, setPlayer2DragValue] = useState<string[]>([]);
	const [player3DragValue, setPlayer3DragValue] = useState<string[]>([]);
	const [player4DragValue, setPlayer4DragValue] = useState<string[]>([]);

	const [twoPlayResults, setTwoPlayResults] = useState<Omit<TTwoPlayResult, "result_id" | "match_id">[]>([]);

	const handleMapPlayerResult = (resultData: string[]): TPostPlayerResult => {
		console.log(resultData);

		const resultObj: TPostPlayerResult = {
			rank:
				resultData.includes("firstPlace") || resultData.includes("winAll")
					? 1
					: resultData.includes("secondPlace")
					? 2
					: resultData.includes("thirdPlace")
					? 3
					: resultData.includes("fourthPlace") || resultData.includes("burntOut")
					? 4
					: 0,
			win_all: resultData.includes("winAll") ? 1 : 0,
			burnt_out: resultData.includes("burntOut") ? 1 : 0,
			swept_out: resultData.includes("sweptOut") ? 1 : 0,
		};

		return resultObj;
	};

	const getNewMatchId = (matchHistory: TMatchHistory[]) => {
		const listId = matchHistory.map((_v) => _v.match_id);

		console.log("xx", listId.length);

		return listId.length > 0 ? Math.max(...listId) + 1 : 1;
	};

	const handleSaveNewMatchResult = () => {
		if (!roomId) return;

		socket.emit(SOCKET_EVENT_NAME.CREATE_RESULT.SEND, {
			roomId,
			matchId: getNewMatchId(matchHistory),
			player1Result: handleMapPlayerResult(player1DragValue),
			player2Result: handleMapPlayerResult(player2DragValue),
			player3Result: handleMapPlayerResult(player3DragValue),
			player4Result: handleMapPlayerResult(player4DragValue),
			twoPlayResults,
			createdBy: cookies.email,
		});

		createStatusToast.current = toast.loading("Đang lưu kết quả trận đấu...", {});
	};

	const resetData = () => {
		setPlayer1DragValue([]);
		setPlayer2DragValue([]);
		setPlayer3DragValue([]);
		setPlayer4DragValue([]);
		setTwoPlayResults([]);

		document.querySelectorAll("input[type=checkbox]").forEach((el) => {
			(el as HTMLInputElement).checked = false;
		});
	};

	const handleOnDragMatchResult = (e: React.DragEvent, value: string) => {
		e.dataTransfer.setData("playerResult", value);
	};

	const handleOnDropMatchResult = (e: React.DragEvent) => {
		const playerResult = e.dataTransfer.getData("playerResult") as string;

		const playerIndex = e.currentTarget.getAttribute("data-player-index");

		if (!playerIndex) return;

		switch (playerIndex) {
			case "1":
				setPlayer1DragValue((prev) => [...prev, playerResult]);
				break;
			case "2":
				setPlayer2DragValue((prev) => [...prev, playerResult]);
				break;
			case "3":
				setPlayer3DragValue((prev) => [...prev, playerResult]);
				break;
			case "4":
				setPlayer4DragValue((prev) => [...prev, playerResult]);
				break;
			default:
				break;
		}
	};

	const handleOnDragTwoPlayResult = (e: React.DragEvent, value: string) => {
		e.dataTransfer.setData("twoPlayResult", value);
	};

	const handleOnDropTwoPlayResult = (e: React.DragEvent) => {
		const twoPlayResult = e.dataTransfer.getData("twoPlayResult") as string;

		const resultIndex = e.currentTarget.getAttribute("data-result-index");
		const resultTarget = e.currentTarget.getAttribute("data-result-target");

		if (!resultIndex || !resultTarget) return;

		switch (resultTarget) {
			case "burner":
				setTwoPlayResults((prev) => {
					const newResults = [...prev];
					newResults[Number(resultIndex)].burner = Number(twoPlayResult);
					return newResults;
				});
				break;
			case "taker":
				setTwoPlayResults((prev) => {
					const newResults = [...prev];
					newResults[Number(resultIndex)].taker = Number(twoPlayResult);
					return newResults;
				});
				break;
			default:
				break;
		}
	};

	const handleOnDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleChangeQuantity = (index: number, value: number) => {
		setTwoPlayResults((prev) => {
			const newResults = [...prev];
			newResults[index].quantity = value;
			return newResults;
		});
	};

	const handleChangeColor = (index: number, value: "red" | "black") => {
		setTwoPlayResults((prev) => {
			const newResults = [...prev];
			newResults[index].two_color = value;
			return newResults;
		});
	};

	const getPlayerName = (playerIndex: number) => {
		switch (playerIndex) {
			case 1:
				return roomDetails.player1_name;
			case 2:
				return roomDetails.player2_name;
			case 3:
				return roomDetails.player3_name;
			case 4:
				return roomDetails.player4_name;
			default:
				return "";
		}
	};

	const handleAddTwoPlayResultRow = () => {
		setTwoPlayResults((prev) => [
			...prev,
			{
				two_color: "black",
				taker: 0,
				burner: 0,
				quantity: 1,
			},
		]);
	};

	const handleRemoveTwoPlayResultRow = (row: number) => {
		setTwoPlayResults((prev) => prev.filter((_, index) => index !== row));
	};

	useEffect(() => {
		if (isShowModal) {
			resetData();
		}
	}, [isShowModal]);

	useEffect(() => {
		socket.on(SOCKET_EVENT_NAME.CREATE_RESULT.RECEIVE, () => {
			console.log("xx", createStatusToast.current);

			toast.success("Lưu kết quả trận đấu thành công!", { id: createStatusToast.current });
		});
	}, []);

	return (
		<ModalWrapper
			title={"Kết quả trận đấu"}
			isShowModal={isShowModal}
			setIsShowModal={setIsShowModal}
		>
			<main className={"w-full flex flex-col gap-4 py-4"}>
				<div className={"w-full flex items-start gap-4"}>
					<div className="w-2/3 flex flex-col gap-4 pr-4 border-r border-r-muted">
						<PlayerResultRow
							onDrop={handleOnDropMatchResult}
							onDragOver={handleOnDragOver}
							playerIndex={1}
							value={player1DragValue}
							onRemoveValue={(item: string) =>
								setPlayer1DragValue((prev) => prev.filter((_v) => _v !== item))
							}
						/>
						<PlayerResultRow
							onDrop={handleOnDropMatchResult}
							onDragOver={handleOnDragOver}
							playerIndex={2}
							value={player2DragValue}
							onRemoveValue={(item: string) =>
								setPlayer2DragValue((prev) => prev.filter((_v) => _v !== item))
							}
						/>
						<PlayerResultRow
							onDrop={handleOnDropMatchResult}
							onDragOver={handleOnDragOver}
							playerIndex={3}
							value={player3DragValue}
							onRemoveValue={(item: string) =>
								setPlayer3DragValue((prev) => prev.filter((_v) => _v !== item))
							}
						/>
						<PlayerResultRow
							onDrop={handleOnDropMatchResult}
							onDragOver={handleOnDragOver}
							playerIndex={4}
							value={player4DragValue}
							onRemoveValue={(item: string) =>
								setPlayer4DragValue((prev) => prev.filter((_v) => _v !== item))
							}
						/>
					</div>
					<div className={"w-1/3 flex flex-wrap gap-4 items-center"}>
						{RESULT_DRAG_ITEMS.filter(
							(_v) =>
								!player1DragValue.includes(_v.key) &&
								!player2DragValue.includes(_v.key) &&
								!player3DragValue.includes(_v.key) &&
								!player4DragValue.includes(_v.key)
						).map((item) => (
							<div
								className={"px-8 py-2 bg-secondary text-light rounded-xl cursor-grab"}
								draggable={true}
								onDragStart={(e) => handleOnDragMatchResult(e, item.key)}
							>
								<Typography type={"large"}>{item.value}</Typography>
							</div>
						))}
					</div>
				</div>
				<div className={"w-full"}>
					<hr />
				</div>
				<div className={"flex flex-col gap-4"}>
					<div className={"flex items-center gap-2"}>
						<Typography type={"h2"}>Kết quả chặt heo</Typography>
						<Button
							size={"lg"}
							className={"px-4"}
							startIcon={<IoMdAdd size={20} />}
							color={"secondary"}
							onClick={handleAddTwoPlayResultRow}
						>
							Thêm kết quả
						</Button>
					</div>
					<div className={"w-full flex items-start gap-4"}>
						<div className={"w-2/3 flex flex-col gap-4"}>
							{twoPlayResults.map((item, index) => (
								<div className={"flex items-center gap-4"}>
									<div
										className={clsx(
											"w-max min-w-24 border-dark text-center px-6 py-2 rounded-2xl",
											{
												"bg-dark text-light": item.burner !== 0,
												"bg-transparent text-dark border-2": item.burner === 0,
											}
										)}
										onDrop={handleOnDropTwoPlayResult}
										onDragOver={handleOnDragOver}
										data-result-index={index.toString()}
										data-result-target={"burner"}
									>
										{item.burner !== 0 ? (
											<Typography type={"h5"}>{getPlayerName(item.burner)}</Typography>
										) : (
											<Typography type={"h5"}>-</Typography>
										)}
									</div>
									<Typography type={"h5"}>Bị chặt/cháy</Typography>
									<Button
										size={"lg"}
										className={"px-4"}
										color={"secondary"}
										onClick={() => handleChangeQuantity(index, item.quantity === 1 ? 2 : 1)}
									>
										{item.quantity} con
									</Button>
									<Button
										size={"lg"}
										className={"px-4"}
										color={item.two_color === "red" ? "danger" : "default"}
										onClick={() =>
											handleChangeColor(index, item.two_color === "red" ? "black" : "red")
										}
									>
										heo {item.two_color === "red" ? "đỏ" : "đen"}
									</Button>
									<Typography type={"h5"}>bởi</Typography>
									<div
										className={clsx(
											"w-max min-w-24 border-dark text-center px-6 py-2 rounded-2xl",
											{
												"bg-dark text-light": item.taker !== 0,
												"bg-transparent text-dark border-2": item.taker === 0,
											}
										)}
										onDrop={handleOnDropTwoPlayResult}
										onDragOver={handleOnDragOver}
										data-result-index={index.toString()}
										data-result-target={"taker"}
									>
										{item.taker !== 0 ? (
											<Typography type={"h5"}>{getPlayerName(item.taker)}</Typography>
										) : (
											<Typography type={"h5"}>-</Typography>
										)}
									</div>
									<Button
										color={"danger"}
										variant={"light"}
										isIconOnly={true}
										size={"lg"}
										className={"group"}
										onClick={() => handleRemoveTwoPlayResultRow(index)}
										startIcon={ICON_CONFIG.CLOSE}
									></Button>
								</div>
							))}
						</div>
						<div className={"w-1/3 flex flex-wrap gap-4 items-center"}>
							{Array.from({ length: 4 }).map((_, index) => (
								<div
									className={"px-8 py-2 bg-secondary text-light rounded-xl cursor-grab"}
									draggable={true}
									onDragStart={(e) => handleOnDragTwoPlayResult(e, (index + 1).toString())}
								>
									<Typography type={"large"}>{getPlayerName(index + 1)}</Typography>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
			<footer>
				<Button
					variant={"solid-3d"}
					color={"primary"}
					size={"xl"}
					fullWidth
					onClick={() => handleSaveNewMatchResult()}
				>
					Lưu
				</Button>
			</footer>
		</ModalWrapper>
	);
};

ModalAddResult.defaultProps = {
	foo: "bar",
};

export default ModalAddResult;
