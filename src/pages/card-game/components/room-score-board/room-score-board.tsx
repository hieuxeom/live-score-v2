import { useState } from "react";
import TableBody from "../../../../components/table/table-body";
import TableCell from "../../../../components/table/table-cell";
import TableHeader from "../../../../components/table/table-header";
import TableRow from "../../../../components/table/table-row";
import TableWrapper from "../../../../components/table/table-wrapper";
import Typography from "../../../../components/typography";
import { TScoreBoard } from "../../../../types/cardgame";
import Radio from "../../../../components/radio";

interface RoomScoreBoardProps {
	scoreBoard: TScoreBoard;
}

const RoomScoreBoard = ({ scoreBoard }: RoomScoreBoardProps) => {
	const { totalScore, matrixScore } = scoreBoard;

	const [displayScoreType, setDisplayScoreType] = useState<string>("total");

	return (
		<>
			<div className={"flex items-end justify-between"}>
				<Typography
					type={"h3"}
					className={"text-secondary inline-block"}
				>
					Bảng điểm
				</Typography>
				<div className={"flex items-center gap-2"}>
					<Radio
						textValue={"Tổng điểm"}
						value={"total"}
						name={"display-score"}
						isDisabled={false}
						isChecked={displayScoreType === "total"}
						color={"default"}
						onSelected={(e) => setDisplayScoreType(e.target.value)}
					/>
					<Radio
						textValue={"Ma trận"}
						value={"matrix"}
						name={"display-score"}
						isDisabled={false}
						isChecked={displayScoreType === "matrix"}
						color={"default"}
						onSelected={(e) => setDisplayScoreType(e.target.value)}
					/>
				</div>
			</div>
			<TableWrapper className={"w-full"}>
				<TableHeader>
					<TableRow>
						<TableCell
							isHeader
							borderType={"full"}
							className={"border-primary-base min-w-max"}
						>
							<Typography className={"min-w-max"}>P1</Typography>
						</TableCell>
						<TableCell
							isHeader
							borderType={"full"}
							className={"border-primary-base min-w-max"}
						>
							<Typography className={"min-w-max"}>P2</Typography>
						</TableCell>
						<TableCell
							isHeader
							borderType={"full"}
							className={"border-primary-base min-w-max"}
						>
							<Typography className={"min-w-max"}>P3</Typography>
						</TableCell>
						<TableCell
							isHeader
							borderType={"full"}
							className={"border-primary-base min-w-max"}
						>
							<Typography className={"min-w-max"}>P4</Typography>
						</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{displayScoreType === "total" ? (
						<TableRow>
							<TableCell
								borderType={"full"}
								className={"border-primary-base text-center"}
							>
								{totalScore.player1}
							</TableCell>
							<TableCell
								borderType={"full"}
								className={"border-primary-base text-center"}
							>
								{totalScore.player2}
							</TableCell>
							<TableCell
								borderType={"full"}
								className={"border-primary-base text-center"}
							>
								{totalScore.player3}
							</TableCell>
							<TableCell
								borderType={"full"}
								className={"border-primary-base text-center"}
							>
								{totalScore.player4}
							</TableCell>
						</TableRow>
					) : (
						matrixScore.map((row, rowIndex) => (
							<TableRow key={rowIndex}>
								{row.map((cell, cellIndex) => (
									<TableCell
										key={cellIndex}
										borderType={"full"}
										className={"border-primary-base text-center"}
									>
										{cell !== null ? cell : "-"}
									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</TableWrapper>
		</>
	);
};

RoomScoreBoard.defaultProps = {};

export default RoomScoreBoard;
