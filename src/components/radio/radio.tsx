import clsx from "clsx";
import { ChangeEvent } from "react";

export interface RadioProps {
	value: string;
	name: string;
	textValue?: string;
	isDisabled?: boolean;
	isChecked?: boolean;
	color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
	onSelected?: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({
	value,
	name,
	textValue,
	isDisabled = false,
	isChecked = false,
	color = "default",
	onSelected,
}: RadioProps) => {
	const MapInputColor: Record<NonNullable<RadioProps["color"]>, string> = {
		default: "checked:border-dark before:bg-dark border-dark",
		primary: "checked:border-primary before:bg-primary border-primary",
		secondary: "checked:border-secondary before:bg-secondary border-secondary",
		success: "checked:border-success before:bg-success border-success",
		warning: "checked:border-warning before:bg-warning border-warning",
		danger: "checked:border-danger before:bg-danger border-danger",
	};

	const MapSpanColor: Record<NonNullable<RadioProps["color"]>, string> = {
		default: "bg-dark",
		primary: "bg-primary",
		secondary: "bg-secondary",
		success: "bg-success",
		warning: "bg-warning",
		danger: "bg-danger",
	};

	const MapLabelColor: Record<NonNullable<RadioProps["color"]>, string> = {
		default: "text-dark",
		primary: "text-primary",
		secondary: "text-secondary",
		success: "text-success",
		warning: "text-warning",
		danger: "text-danger",
	};

	return (
		<div className="inline-flex items-center cursor-pointer min-w-max">
			<label
				className="relative flex cursor-pointer items-center rounded-full p-2 "
				htmlFor={name + value}
			>
				<input
					name={name}
					type="radio"
					className={clsx(
						"before:content[''] peer h-4 w-4 cursor-pointer appearance-none rounded-full border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-10",
						MapInputColor[color]
					)}
					id={name + value}
					value={value}
					disabled={isDisabled}
					onChange={onSelected}
					checked={isChecked}
				/>
				<span
					className={clsx(
						"absolute w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
						MapSpanColor[color]
					)}
				></span>
			</label>
			<label
				className={clsx("cursor-pointer", MapLabelColor[color])}
				htmlFor={name + value}
			>
				{textValue || value}
			</label>
		</div>
	);
};

export default Radio;
