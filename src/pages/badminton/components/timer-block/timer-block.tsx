interface TimerBlockProps {
	hour?: string;
	minute?: string;
	second?: string;
	hideHour?: boolean;
	hideMinute?: boolean;
	hideSecond?: boolean;
}

const Timer = (value: string, type: "hours" | "minutes" | "seconds") => {
	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center gap-0.5">
				<div className="p-2 relative bg-dark-100 w-8">
					<h3 className="font-semibold text-2xl text-dark max-w-[44px] text-center relative z-20">
						{value[0]}
					</h3>
				</div>
				<div className="p-2 relative bg-dark-100 w-8">
					<h3 className="font-semibold text-2xl text-dark max-w-[44px] text-center relative z-20">
						{value[1]}
					</h3>
				</div>
			</div>
			<p className="text-sm font-normal text-dark mt-1 text-center w-full">{type}</p>
		</div>
	);
};

const TimerBlock = ({
	hour = "00",
	minute = "00",
	second = "00",
	hideHour = false,
	hideMinute = false,
	hideSecond = false,
}: TimerBlockProps) => (
	<div className="flex items-center justify-center w-max gap-4">
		{!hideHour && Timer(hour, "hours")}
		{!hideMinute && Timer(minute, "minutes")}
		{!hideSecond && Timer(second, "seconds")}
	</div>
);

export default TimerBlock;
