import Typography from "../../../../components/typography";

interface PlayerInRoomProps {
	playersInRoom: string[];
}

const PlayerInRoom = ({ playersInRoom }: PlayerInRoomProps) => {
	return (
		<>
			<Typography
				type={"h3"}
				className={"text-secondary inline-block"}
			>
				Người chơi trong phòng
			</Typography>
			<div
				className={
					"flex flex-col gap-1 scrollable-content bg-scroll-box bg-[position:bottom_center,top_center,bottom_center,top_center] bg-[size:100%_20px,100%_20px,100%_20px,100%_20px] bg-no-repeat"
				}
				style={{
					backgroundAttachment: "local, local, scroll, scroll",
				}}
			>
				{playersInRoom.map((player) => (
					<Typography
						type={"p"}
						className={"text-dark-300"}
					>
						{player}
					</Typography>
				))}
			</div>
		</>
	);
};

export default PlayerInRoom;
