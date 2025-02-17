import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router";
import Button from "../../../../components/button";
import Typography from "../../../../components/typography";
import useSocket from "../../../../hooks/useSocket";
import { TMatchHistory, TPostPlayerResult, TRoomInfo, TTwoPlayResult } from "../../../../types/cardgame";
import PlayerResultRow from "../player-result-row";
import ModalWrapper from "../../../../components/modal-wrapper";
import ICON_CONFIG from "../../../../configs/icon.config";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import SOCKET_EVENT_NAMES from "../../../../configs/socket-event-names.config";
import Select from "../../../../components/select";
import { BASE_RESULT, RESULT_DRAG_ITEMS, SPECIAL_RESULT } from "../drag-items";

interface ModalAddResultProps {
	isShowModal: boolean;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	matchHistory: TMatchHistory[];
	roomInfo: TRoomInfo;
}

const ModalAddResult = ({ isShowModal, setIsShowModal, roomInfo }: ModalAddResultProps) => {
	const { roomId } = useParams();

	const [cookies] = useCookies(["username"]);

	const socket = useSocket();

	const createStatusToast = useRef<any>(null);

	const [player1DragValue, setPlayer1DragValue] = useState<string[]>([]);
	const [player2DragValue, setPlayer2DragValue] = useState<string[]>([]);
	const [player3DragValue, setPlayer3DragValue] = useState<string[]>([]);
	const [player4DragValue, setPlayer4DragValue] = useState<string[]>([]);

	const [twoPlayResults, setTwoPlayResults] = useState<Omit<TTwoPlayResult, "result_id" | "match_id">[]>([]);

	const [availableDragResults, setAvailableDragResults] = useState([...RESULT_DRAG_ITEMS]);

	const getPlayerName = (playerIndex: number) => {
		switch (playerIndex) {
			case 1:
				return roomInfo.player1_name;
			case 2:
				return roomInfo.player2_name;
			case 3:
				return roomInfo.player3_name;
			case 4:
				return roomInfo.player4_name;
			default:
				return "";
		}
	};

	const listItems = [
		{
			key: 1,
			value: getPlayerName(1),
		},
		{
			key: 2,
			value: getPlayerName(2),
		},
		{
			key: 3,
			value: getPlayerName(3),
		},
		{
			key: 4,
			value: getPlayerName(4),
		},
	];

	const handleMapPlayerResult = (resultData: string[]): TPostPlayerResult => {
		const resultObj: TPostPlayerResult = {
			rank: resultData.includes("noResult")
				? 0
				: resultData.includes("firstPlace") || resultData.includes("winAll")
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

	const handleSaveNewMatchResult = () => {
		if (!roomId) return;

		socket.emit(SOCKET_EVENT_NAMES.CREATE_RESULT.SEND, {
			roomId,
			player1Result: handleMapPlayerResult(player1DragValue),
			player2Result: handleMapPlayerResult(player2DragValue),
			player3Result: handleMapPlayerResult(player3DragValue),
			player4Result: handleMapPlayerResult(player4DragValue),
			twoPlayResults,
			createdBy: cookies.username,
		});

		createStatusToast.current = toast.loading("Đang lưu kết quả trận đấu...", {});
	};

	const resetData = () => {
		setPlayer1DragValue([]);
		setPlayer2DragValue([]);
		setPlayer3DragValue([]);
		setPlayer4DragValue([]);
		setTwoPlayResults([]);
		setAvailableDragResults([...RESULT_DRAG_ITEMS]);

		document.querySelectorAll("input[type=checkbox]").forEach((el) => {
			(el as HTMLInputElement).checked = false;
		});
	};

	const handleOnDragMatchResult = (e: React.DragEvent, value: string) => {
		e.dataTransfer.setData("playerResult", value);
	};

	const handleWinAllResult = (playerIndex: number) => {
		switch (playerIndex) {
			case 1:
				setPlayer1DragValue((prev) => [...prev, "winAll"]);
				setPlayer2DragValue((prev) => [...prev, "sweptOut"]);
				setPlayer3DragValue((prev) => [...prev, "sweptOut"]);
				setPlayer4DragValue((prev) => [...prev, "sweptOut"]);
				break;
			case 2:
				setPlayer1DragValue((prev) => [...prev, "sweptOut"]);
				setPlayer2DragValue((prev) => [...prev, "winAll"]);
				setPlayer3DragValue((prev) => [...prev, "sweptOut"]);
				setPlayer4DragValue((prev) => [...prev, "sweptOut"]);
				break;
			case 3:
				setPlayer1DragValue((prev) => [...prev, "sweptOut"]);
				setPlayer2DragValue((prev) => [...prev, "sweptOut"]);
				setPlayer3DragValue((prev) => [...prev, "winAll"]);
				setPlayer4DragValue((prev) => [...prev, "sweptOut"]);
				break;
			case 4:
				setPlayer1DragValue((prev) => [...prev, "sweptOut"]);
				setPlayer2DragValue((prev) => [...prev, "sweptOut"]);
				setPlayer3DragValue((prev) => [...prev, "sweptOut"]);
				setPlayer4DragValue((prev) => [...prev, "winAll"]);
				break;
			default:
				break;
		}
		setAvailableDragResults([]);
	};

	const handleNormalResult = (playerIndex: number, playerResult: string) => {
		switch (playerIndex) {
			case 1:
				setPlayer1DragValue((prev) => [...prev, playerResult]);
				break;
			case 2:
				setPlayer2DragValue((prev) => [...prev, playerResult]);
				break;
			case 3:
				setPlayer3DragValue((prev) => [...prev, playerResult]);
				break;
			case 4:
				setPlayer4DragValue((prev) => [...prev, playerResult]);
				break;
			default:
				break;
		}
	};

	const handleOnDropMatchResult = (e: React.DragEvent) => {
		const playerResult = e.dataTransfer.getData("playerResult") as string;

		const playerIndex = e.currentTarget.getAttribute("data-player-index");

		if (SPECIAL_RESULT.some((_v) => _v.key === playerResult)) {
			if (playerResult === "winAll") {
				return handleWinAllResult(Number(playerIndex));
			}
		}

		if (BASE_RESULT.some((_v) => _v.key === playerResult)) {
			handleNormalResult(Number(playerIndex), playerResult);
		}
	};

	useEffect(() => {
		const currentSelectedResults = [player1DragValue, player2DragValue, player3DragValue, player4DragValue].flat();

		if (currentSelectedResults.length === 0) {
			setAvailableDragResults(RESULT_DRAG_ITEMS);
		} else {
			if (currentSelectedResults.includes("winAll")) {
				setAvailableDragResults([]);
			} else {
				setAvailableDragResults(
					BASE_RESULT.filter((_v) => !currentSelectedResults.includes(_v.key) || _v.key === "burntOut")
				);
			}
		}
	}, [player1DragValue, player2DragValue, player3DragValue, player4DragValue]);

	const handleRemovePlayerResult = (playerIndex: number, playerResult: string) => {
		if (playerResult === "winAll") {
			setAvailableDragResults(RESULT_DRAG_ITEMS);
			setPlayer1DragValue([]);
			setPlayer2DragValue([]);
			setPlayer3DragValue([]);
			setPlayer4DragValue([]);
		} else {
			setAvailableDragResults((prev) => [
				...prev,
				{ key: playerResult, value: RESULT_DRAG_ITEMS.find((_v) => _v.key === playerResult)?.value || "" },
			]);
		}

		switch (playerIndex) {
			case 1:
				setPlayer1DragValue((prev) => prev.filter((_v) => _v !== playerResult));
				break;
			case 2:
				setPlayer2DragValue((prev) => prev.filter((_v) => _v !== playerResult));
				break;
			case 3:
				setPlayer3DragValue((prev) => prev.filter((_v) => _v !== playerResult));
				break;
			case 4:
				setPlayer4DragValue((prev) => prev.filter((_v) => _v !== playerResult));
				break;
			default:
				break;
		}
	};

	const handleOnDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleSelectBurner = (resultIndex: number, playerIndex: number) => {
		setTwoPlayResults((prev) => {
			const newResults = [...prev];
			newResults[resultIndex].burner = playerIndex;
			return newResults;
		});
	};

	const handleSelectTaker = (resultIndex: number, playerIndex: number) => {
		if (twoPlayResults[resultIndex].burner === Number(playerIndex)) {
			return;
		}

		setTwoPlayResults((prev) => {
			const newResults = [...prev];
			newResults[resultIndex].taker = playerIndex;
			return newResults;
		});
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

	const validResultData = () => {
		if (
			player1DragValue.length === 0 ||
			player2DragValue.length === 0 ||
			player3DragValue.length === 0 ||
			player4DragValue.length === 0
		) {
			return false;
		}

		if (twoPlayResults.length > 0) {
			const isTwoPlayResultValid = twoPlayResults.every(
				(_v) => _v.burner !== 0 && _v.taker !== 0 && _v.quantity !== 0
			);

			if (!isTwoPlayResultValid) {
				return false;
			}
		} else {
			return true;
		}

		return true;
	};

	useEffect(() => {
		if (isShowModal) {
			resetData();
		}
	}, [isShowModal]);

	useEffect(() => {
		socket.on(SOCKET_EVENT_NAMES.CREATE_RESULT.RECEIVE, () => {
			toast.success("Lưu kết quả trận đấu thành công!", { id: createStatusToast.current });
		});
	}, []);

	return (
		<ModalWrapper
			title={"Kết quả trận đấu"}
			isShowModal={isShowModal}
			setIsShowModal={setIsShowModal}
			classNames={{
				modal: "-top-16",
			}}
		>
			<main className={"w-full flex flex-col gap-4 py-4"}>
				<div className={"w-full flex items-start gap-4"}>
					<div className="w-2/3 flex flex-col gap-4 pr-4 border-r border-r-muted">
						<PlayerResultRow
							playerName={roomInfo.player1_name}
							onDrop={handleOnDropMatchResult}
							onDragOver={handleOnDragOver}
							playerIndex={1}
							value={player1DragValue}
							onRemoveValue={(item: string) => handleRemovePlayerResult(1, item)}
						/>
						<PlayerResultRow
							playerName={roomInfo.player2_name}
							onDrop={handleOnDropMatchResult}
							onDragOver={handleOnDragOver}
							playerIndex={2}
							value={player2DragValue}
							onRemoveValue={(item: string) => handleRemovePlayerResult(2, item)}
						/>
						<PlayerResultRow
							playerName={roomInfo.player3_name}
							onDrop={handleOnDropMatchResult}
							onDragOver={handleOnDragOver}
							playerIndex={3}
							value={player3DragValue}
							onRemoveValue={(item: string) => handleRemovePlayerResult(3, item)}
						/>
						<PlayerResultRow
							playerName={roomInfo.player4_name}
							onDrop={handleOnDropMatchResult}
							onDragOver={handleOnDragOver}
							playerIndex={4}
							value={player4DragValue}
							onRemoveValue={(item: string) => handleRemovePlayerResult(4, item)}
						/>
					</div>
					<div className={"w-1/3 flex flex-wrap gap-4 items-center"}>
						{availableDragResults.map((item) => (
							<div
								key={item.key}
								className={"px-8 py-2 bg-primary text-light rounded-xl cursor-grab"}
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
							size={"md"}
							className={"px-4"}
							startIcon={ICON_CONFIG.NEW}
							color={"primary"}
							variant={"solid-3d"}
							onClick={handleAddTwoPlayResultRow}
						>
							Thêm kết quả
						</Button>
					</div>
					<div className={"w-full flex items-start gap-4"}>
						<div className={"w-full flex flex-col gap-4"}>
							{twoPlayResults.map((item, index) => (
								<div
									className={"flex items-center gap-4"}
									key={index}
								>
									<Select
										name={`burner-${index}`}
										placeholder={"Chọn người thua"}
										items={listItems}
										value={item.burner}
										className={"min-w-32"}
										onChange={(e) => handleSelectBurner(index, Number(e.target.value))}
									/>
									<Typography type={"h5"}>Bị chặt/cháy</Typography>
									<Button
										size={"sm"}
										className={"min-w-24 px-4"}
										color={"secondary"}
										onClick={() => handleChangeQuantity(index, item.quantity === 1 ? 2 : 1)}
									>
										{item.quantity} con
									</Button>
									<Button
										size={"sm"}
										className={"min-w-24 px-4"}
										color={item.two_color === "red" ? "danger" : "default"}
										onClick={() =>
											handleChangeColor(index, item.two_color === "red" ? "black" : "red")
										}
									>
										heo {item.two_color === "red" ? "đỏ" : "đen"}
									</Button>
									<Typography type={"h5"}>bởi</Typography>
									<Select
										name={`taker-${index}`}
										placeholder={"Chọn người ăn"}
										items={listItems}
										value={item.taker}
										className={"min-w-32"}
										onChange={(e) => handleSelectTaker(index, Number(e.target.value))}
									/>
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
					</div>
				</div>
			</main>
			<footer>
				<Button
					variant={"solid-3d"}
					color={"success"}
					size={"xl"}
					fullWidth
					isDisabled={!validResultData()}
					onClick={() => handleSaveNewMatchResult()}
					// onClick={() => console.log(validResultData())}
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
