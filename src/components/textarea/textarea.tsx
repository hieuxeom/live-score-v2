import React, { ChangeEvent, useState } from "react";

import clsx from "clsx";
import Typography from "../typography";

interface TextareaProps {
	id?: string;
	name: string;
	label?: string;
	labelPlacement?: "top" | "left";
	placeholder?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	value: string;
	errorMessage?: string;
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
	isDisabled?: boolean;
	isError?: boolean;
	isRequired?: boolean;
	classNames?: {
		wrapper?: string;
		label?: string;
		input?: string;
	};
	rows?: number;
	cols?: number;
}

const Textarea = ({
	id,
	name,
	label,
	labelPlacement = "top",
	placeholder,
	onChange,
	onFocus,
	onBlur,
	value,
	errorMessage,
	startContent,
	endContent,
	isDisabled = false,
	isError = false,
	isRequired = false,
	classNames,
	rows = 3,
	cols,
}: TextareaProps) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [isTouched, setIsTouched] = useState(false);
	const MapWrapperClasses: Record<NonNullable<TextareaProps["labelPlacement"]>, string> = {
		top: "flex flex-col justify-center gap-0.5",
		left: "flex items-center gap-2",
	};

	return (
		<div className={clsx("w-full", classNames?.wrapper, MapWrapperClasses[labelPlacement])}>
			{label && (
				<label
					htmlFor={id}
					className={clsx("min-w-max text-secondary", classNames?.label, {
						"!text-danger": isTouched && isError && value.length > 0,
					})}
				>
					<Typography type={"p"}>
						{label} {isRequired && <span className="text-danger">*</span>}
					</Typography>
				</label>
			)}
			<div className={"w-full h-full flex items-center group relative"}>
				{startContent && (
					<div
						className={clsx(
							"min-w-max h-full px-4 py-2 border transition-all duration-300",
							"rounded-s-xl border-b-4 border-r-0 group-hover:border-secondary",
							{
								"!border-danger !text-danger": isError && value.length > 0,
								"border-secondary text-secondary": isFocus || (!isError && value.length > 0),
								"bg-secondary-400 text-light": isDisabled,
								"border-secondary/50 text-secondary/50": !isFocus && value.length === 0,
							}
						)}
					>
						{startContent}
					</div>
				)}
				<textarea
					rows={rows}
					cols={cols}
					id={id}
					name={name}
					value={value}
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
					className={clsx(
						"w-full px-4 py-2 border rounded-xl border-b-4 outline-none transition-all duration-300",
						"focus:border-secondary group-hover:border-secondary",
						classNames?.input,
						{
							"!border-danger !text-danger": isTouched && isError && value.length > 0,
							"border-secondary": isFocus || (!isError && value.length > 0),
							"!rounded-s-none !border-l-0 pl-0": startContent,
							"!rounded-e-none !border-r-0": endContent,
							"bg-secondary-400 text-light": isDisabled,
							"border-secondary/50": !isFocus && value.length === 0,
						}
					)}
					onClick={() => setIsTouched(true)}
				/>
				{endContent && (
					<div
						className={clsx(
							"min-w-max h-full px-4 py-2 border transition-all duration-300",
							"rounded-e-xl border-b-4 border-l-0 group-hover:border-secondary",
							{
								"!border-danger !text-danger": isError && value.length > 0,
								"border-secondary text-secondary": isFocus || (!isError && value.length > 0),
								"bg-secondary-400 text-light": isDisabled,
								"border-secondary/50 text-secondary/50": !isFocus && value.length === 0,
							}
						)}
					>
						{endContent}
					</div>
				)}
			</div>

			{isTouched && isError && value.length > 0 && (
				<Typography
					type={"tiny"}
					className={clsx("text-danger italic mt-2")}
				>
					{errorMessage}
				</Typography>
			)}
		</div>
	);
};

export default Textarea;
