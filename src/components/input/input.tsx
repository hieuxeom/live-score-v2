import React, { ChangeEvent, useState } from "react";

import clsx from "clsx";
import Typography from "../typography";

interface InputProps {
	type?: "text" | "number" | "email" | "password";
	id?: string;
	name: string;
	label?: string;
	labelPlacement?: "top" | "left";
	placeholder?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	value: string;
	validator?: (value: string) => boolean;
	errorMessage?: string;
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
	isDisabled?: boolean;
	isError?: boolean;
	classNames?: {
		wrapper?: string;
		label?: string;
		input?: string;
	};
}

const Input = ({
	type = "text",
	id,
	name,
	label,
	labelPlacement = "top",
	placeholder,
	onChange,
	onFocus,
	onBlur,
	value,
	validator,
	errorMessage,
	startContent,
	endContent,
	isDisabled = false,
	isError = false,
	classNames,
}: InputProps) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const MapWrapperClasses: Record<NonNullable<InputProps["labelPlacement"]>, string> = {
		top: "flex flex-col justify-center gap-0.5",
		left: "flex items-center gap-2",
	};

	const handleValidator = () => {
		if (value === "") return true;
		return validator ? validator(value) : true;
	};

	return (
		<div className={clsx("w-full", classNames?.wrapper, MapWrapperClasses[labelPlacement])}>
			{label && (
				<label
					htmlFor={id}
					className={clsx("min-w-max", classNames?.label, {
						"!text-danger": (validator && !handleValidator()) || isError,
					})}
				>
					<Typography type={"p"}>{label}</Typography>
				</label>
			)}
			<div className={"w-full flex items-center group"}>
				{startContent && (
					<div
						className={clsx(
							"h-full px-4 py-2 border transition-colors duration-300",
							"border-secondary/50 rounded-s-xl border-b-4 group-hover:border-secondary",
							{
								"!border-danger": (validator && !handleValidator()) || isError,
								"!border-secondary": isFocus && handleValidator() && value.length === 0,
								"bg-secondary-400 text-light": isDisabled,
							}
						)}
					>
						{startContent}
					</div>
				)}
				<input
					id={id}
					name={name}
					value={value}
					type={type}
					onChange={(e) => onChange && onChange(e)}
					onFocus={() => {
						setIsFocus(true);
						onFocus && onFocus();
					}}
					onBlur={() => {
						setIsFocus(false);
						onBlur && onBlur();
					}}
					placeholder={placeholder}
					disabled={isDisabled}
					inputMode={type === "number" ? "numeric" : undefined}
					pattern={type === "number" ? "[0-9]*" : undefined}
					className={clsx(
						"w-full px-4 py-2 border border-secondary/50 rounded-xl border-b-4 outline-none transition-colors duration-300",
						"focus:border-secondary hover:border-secondary",
						classNames?.input,
						{
							"!border-danger text-danger": (validator && !handleValidator()) || isError,
							"!border-secondary": value.length !== 0 && handleValidator() && !isError,
							"!rounded-s-none !border-l-0": startContent,
							"!rounded-e-none !border-r-0": endContent,
							"bg-secondary-400 text-light": isDisabled,
						},
						type === "number" &&
							"appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					)}
				/>
				{endContent && (
					<div
						className={clsx(
							"h-full px-4 py-2 border transition-colors duration-300",
							"border-l-0 border-secondary/50 rounded-e-xl border-b-4 group-hover:border-secondary",
							{
								"!border-secondary": isFocus || value.length > 0,
								"!border-danger": (validator && !handleValidator()) || isError,
								"bg-secondary-400 text-light": isDisabled,
							}
						)}
					>
						{endContent}
					</div>
				)}
			</div>

			{errorMessage !== undefined && (
				<Typography
					type={"tiny"}
					className={clsx("text-danger italic mt-2", {
						invisible: !isError && (!validator || handleValidator()),
						visible: isError || (validator && !handleValidator()),
					})}
				>
					{errorMessage}
				</Typography>
			)}
		</div>
	);
};

export default Input;
