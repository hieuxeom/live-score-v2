import React, { ChangeEvent, useState } from "react";

import clsx from "clsx";
import Typography from "../typography";

interface InputProps {
	type?: "text" | "number" | "email" | "password";
	id?: string;
	name: string;
	label: string;
	labelPlacement?: "top" | "left";
	placeholder?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	validator?: (value: string) => boolean;
	errorMessage?: string;
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
}

const Input = ({
	type = "text",
	id,
	name,
	validator,
	placeholder,
	errorMessage,
	startContent,
	endContent,
	label,
	labelPlacement = "top",
	onChange,
	value,
}: InputProps) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const MapWrapperClasses: Record<NonNullable<InputProps["labelPlacement"]>, string> = {
		top: "flex flex-col justify-center gap-0.5",
		left: "flex items-center gap-2",
	};

	const handleValidator = () => {
		if (value === "") {
			return true;
		}
		if (validator) {
			return validator(value);
		}
		return true;
	};

	return (
		<div className={clsx("w-full", MapWrapperClasses[labelPlacement])}>
			<label
				htmlFor={id}
				className={clsx("min-w-max", {
					"!text-danger": validator && !handleValidator(),
				})}
			>
				<Typography type={"p"}>{label}</Typography>
			</label>
			<div className={"w-full flex items-center group"}>
				{startContent && (
					<div
						className={clsx(
							"h-full px-4 py-2 border transition-colors duration-300",
							"border-secondary/50 rounded-s-xl border-b-4 group-hover:border-secondary ",
							{
								"!border-danger": validator && !handleValidator(),
								"!border-secondary": isFocus && handleValidator() && value.length === 0,
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
					onChange={onChange}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					placeholder={placeholder}
					className={clsx(
						"w-full px-4 py-2 border border-secondary/50 rounded-xl border-b-4 outline-none transition-colors duration-300",
						"focus:border-secondary hover:border-secondary",
						{
							"!border-danger text-danger": validator && !handleValidator(),
							"!border-secondary": value.length !== 0 && handleValidator(),
							"!rounded-s-none !border-l-0": startContent,
							"!rounded-e-none !border-r-0": endContent,
						}
					)}
				/>
				{endContent && (
					<div
						className={clsx(
							"h-full px-4 py-2 border transition-colors duration-300",
							"border-l-0 border-secondary/50 rounded-e-xl border-b-4 group-hover:border-secondary",
							{
								"!border-secondary": isFocus && handleValidator() && value.length === 0,
								"!border-danger": validator && !handleValidator(),
							}
						)}
					>
						{endContent}
					</div>
				)}
			</div>
			{validator && !handleValidator() && value !== "" && errorMessage && (
				<Typography
					type={"tiny"}
					className={clsx("text-danger italic mt-2 visible")}
				>
					{errorMessage}
				</Typography>
			)}
		</div>
	);
};

export default Input;
