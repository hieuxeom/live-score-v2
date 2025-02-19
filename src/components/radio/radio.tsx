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
		primary: "checked:border-primary-base before:bg-primary-base border-primary-base",
		secondary: "checked:border-secondary-base before:bg-secondary-base border-secondary-base",
		success: "checked:border-success-base before:bg-success-base border-success-base",
		warning: "checked:border-warning-base before:bg-warning-base border-warning-base",
		danger: "checked:border-danger-base before:bg-danger-base border-danger-base",
	};

	const MapSpanColor: Record<NonNullable<RadioProps["color"]>, string> = {
		default: "bg-dark",
		primary: "bg-primary-base",
		secondary: "bg-secondary-light",
		success: "bg-success-base",
		warning: "bg-warning-base",
		danger: "bg-danger-base",
	};

	const MapLabelColor: Record<NonNullable<RadioProps["color"]>, string> = {
		default: "text-dark",
		primary: "text-primary-base",
		secondary: "text-secondary-base",
		success: "text-success-base",
		warning: "text-warning-base",
		danger: "text-danger-base",
	};

	return (
		<div className="inline-flex items-center cursor-pointer min-w-max">
			<label
				className="relative flex cursor-pointer items-center rounded-full p-2"
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
						"absolute  w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
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
