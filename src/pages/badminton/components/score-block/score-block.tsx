import clsx from "clsx";
import Typography from "../../../../components/typography";

interface ScoreBlockProps {
	side: "left" | "right";
	score: number;
}

const ScoreBlock = ({ side, score }: ScoreBlockProps) => {
	const MapBlockColor: Record<ScoreBlockProps["side"], string> = {
		left: "bg-primary shadow-secondary-1 hover:!shadow-secondary-3 hover:translate-y-2 duration-300 ease-in-out",
		right: "bg-secondary shadow-primary-1 hover:!shadow-primary-2 hover:translate-y-2 duration-300 ease-in-out",
	};

	return (
		<div
			className={clsx(
				"w-full text-center h-full p-16 rounded-2xl flex flex-col items-center gap-4",
				MapBlockColor[side]
			)}
		>
			<Typography
				type={"h1"}
				className={"!text-[24rem] text-light"}
			>
				{score}
			</Typography>
		</div>
	);
};

export default ScoreBlock;
