import Typography from "../../../../components/typography";
import { RESULT_DRAG_ITEMS } from "../drag-items";
interface PlayerResultRowProps {
	playerName: string;
	onDrop: (e: React.DragEvent) => void;
	onDragOver: (e: React.DragEvent) => void;
	playerIndex: number;
	value: string[];
	onRemoveValue: (e: string) => void;
}

const PlayerResultRow = ({
	playerName,
	onDrop,
	onDragOver,
	playerIndex,
	value,
	onRemoveValue,
}: PlayerResultRowProps) => {
	return (
		<div className={"flex items-center gap-4"}>
			<div className={"w-40 text-center py-2 bg-secondary text-light rounded-xl"}>
				<Typography type={"large"}>{playerName}</Typography>
			</div>
			<div
				className={"w-full flex flex-wrap items-center gap-2 p-1 rounded-xl border-2 border-secondary"}
				onDrop={onDrop}
				onDragOver={onDragOver}
				data-player-index={playerIndex.toString()}
			>
				{value.length < 1 ? (
					<div
						// key={`player-${playerIndex}-result-${item}`}
						className={"px-2 py-1 text-dark rounded-lg cursor-grab"}
					>
						<Typography
							type={"small"}
							className={"italic"}
						>
							Chưa ghi nhận kết quả nào
						</Typography>
					</div>
				) : (
					value.map((item) => (
						<div
							key={`player-${playerIndex}-result-${item}`}
							className={"px-4 py-1 bg-primary w-max text-light rounded-lg cursor-grab"}
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
