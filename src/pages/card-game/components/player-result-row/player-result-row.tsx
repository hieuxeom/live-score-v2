import Typography from "../../../../components/typography";
import { RESULT_DRAG_ITEMS } from "../drag-items";
interface PlayerResultRowProps {
	onDrop: (e: React.DragEvent) => void;
	onDragOver: (e: React.DragEvent) => void;
	playerIndex: number;
	value: string[];
	onRemoveValue: (e: string) => void;
}

const PlayerResultRow = ({ onDrop, onDragOver, playerIndex, value, onRemoveValue }: PlayerResultRowProps) => {
	return (
		<div className={"flex items-center gap-4"}>
			<div className={"min-w-max px-6 py-2 bg-dark text-light rounded-2xl"}>
				<Typography type={"h3"}>Player {playerIndex}</Typography>
			</div>
			<div
				className={"w-full flex flex-wrap items-center gap-2 p-2 rounded-2xl border-2 border-secondary-base"}
				onDrop={onDrop}
				onDragOver={onDragOver}
				data-player-index={playerIndex.toString()}
			>
				{value.length < 1 ? (
					<Typography className={"italic"}>Chưa ghi nhận kết quả nào</Typography>
				) : (
					value.map((item) => (
						<div
							key={`player-${playerIndex}-result-${item}`}
							className={"px-4 py-1 bg-dark w-max text-light rounded-lg cursor-grab"}
							onClick={() => onRemoveValue(item)}
						>
							<Typography type={"small"}>
								{RESULT_DRAG_ITEMS.find((i) => i.key === item)?.value}
							</Typography>
						</div>
					))
				)}
			</div>
		</div>
	);
};

PlayerResultRow.defaultProps = {
	place: null,
};

export default PlayerResultRow;
