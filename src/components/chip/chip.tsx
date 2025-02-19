import React from "react";
import { TBaseColors, TBaseRadius, TBaseSize } from "../../types/general";
import clsx from "clsx";

interface ChipProps {
	width?: "full" | "max-content";
	size?: Extract<TBaseSize, "sm" | "md" | "lg" | "xl">;
	radius?: TBaseRadius;
	color?: TBaseColors;
	children: React.ReactNode;
}

const Chip = ({ width = "max-content", radius = "full", size = "md", color = "default", children }: ChipProps) => {
	const MapColorClassname: Record<NonNullable<ChipProps["color"]>, string> = {
		default: "bg-dark text-white",
		primary: "bg-primary text-white",
		secondary: "bg-secondary text-white",
		success: "bg-success text-white",
		danger: "bg-danger text-white",
		warning: "bg-warning text-white",
	};

	const MapSizeClassname: Record<NonNullable<ChipProps["size"]>, string> = {
		sm: "text-xs px-2.5 py-1 ",
		md: "text-sm px-3.5 py-1.5 ",
		lg: "text-base px-4 py-1.5 ",
		xl: "text-xl px-6 py-2",
	};

	const MapRadiusClassname: Record<NonNullable<ChipProps["radius"]>, string> = {
		full: "!rounded-full",
		sm: "!rounded-sm",
		md: "!rounded-md",
		lg: "!rounded-lg",
		xl: "!rounded-xl",
		"2xl": "!rounded-2xl",
		"3xl": "!rounded-3xl",
		none: "!rounded-none",
	};

	return (
		<span
			className={clsx(MapSizeClassname[size], MapColorClassname[color], MapRadiusClassname[radius], {
				"w-full": width === "full",
				"max-content": width === "max-content",
			})}
		>
			{children}
		</span>
	);
};

export default Chip;
