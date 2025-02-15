import clsx from "clsx";
import { HTMLProps } from "react";

interface WrapperProps {
	size?: "screen" | "maxContent" | "full";
	orientation?: "horizontal" | "vertical";
	centerX?: boolean;
	centerY?: boolean;
	children: React.ReactNode;
	gapSize?: number;
	style?: React.CSSProperties;
	className?: HTMLProps<HTMLElement>["className"];
}

const Wrapper = ({
	style,
	size = "full",
	orientation = "horizontal",
	centerX = false,
	centerY = false,
	gapSize = 4,
	className,
	children,
}: WrapperProps) => {
	const getSizeClasses = () => {
		switch (size) {
			case "screen":
				return "w-screen min-h-screen h-full";
			case "maxContent":
				return "w-max-content h-max-content";
			case "full":
				return "w-full h-full";
		}
	};

	const getCenterClasses = () => {
		switch (orientation) {
			case "horizontal":
				return clsx("flex", `gap-${gapSize}`, centerX && "justify-center", centerY && "items-center");
			case "vertical":
				return clsx("flex flex-col", `gap-${gapSize}`, centerX && "items-center", centerY && "justify-center");
		}
	};

	return (
		<section
			style={style}
			className={clsx(getSizeClasses(), getCenterClasses(), className)}
		>
			{children}
		</section>
	);
};

export default Wrapper;
