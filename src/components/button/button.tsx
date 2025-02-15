import clsx from "clsx";
import { TBaseColors, TBaseSize, TBaseVariants } from "../../types/general";

interface ButtonProps {
	color?: TBaseColors;
	size?: Extract<TBaseSize, "sm" | "md" | "lg" | "xl" | "2xl">;
	variant?: TBaseVariants | "solid-3d" | "bordered-3d";
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	isIconOnly?: boolean;
	isDisabled?: boolean;
	showBackground?: boolean;
	fullWidth?: boolean;
	className?: string;
	onClick?: () => any;
	children?: React.ReactNode;
}

const Button = ({
	color = "default",
	size = "md",
	variant = "solid",
	startIcon,
	endIcon,
	isIconOnly = false,
	isDisabled = false,
	showBackground = true,
	fullWidth = false,
	className,
	onClick,
	children,
}: ButtonProps) => {
	if (variant === "solid-3d" || variant === "bordered-3d") {
		const generateButtonClasses = (color: ButtonProps["color"], variant: ButtonProps["variant"]) => {
			if (isDisabled) {
				return "before:bg-secondary-200 !cursor-not-allowed";
			}

			switch (variant) {
				case "solid-3d":
					return color === "primary" ? "before:bg-secondary" : "before:bg-primary";

				case "bordered-3d":
					return `before:bg-${color}`;
			}
		};

		const generateSpanClasses = (color: ButtonProps["color"], variant: ButtonProps["variant"]) => {
			if (isDisabled) {
				return "bg-secondary-50 text-white border-secondary-50 text-secondary-200";
			}

			switch (variant) {
				case "solid-3d":
					return color === "primary"
						? "bg-primary border-primary text-light"
						: "bg-secondary border-secondary text-light";

				case "bordered-3d":
					return color === "primary"
						? "bg-white border-primary text-primary"
						: "bg-white border-secondary text-secondary";
			}
		};

		const generateSpanSizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
			sm: "group-hover:translate-y-1 py-1 px-6 text-sm",
			md: "group-hover:translate-y-1.5 py-1.5 px-8 text",
			lg: "group-hover:translate-y-1.5 py-2 px-12 text-lg",
			xl: "group-hover:translate-y-1.5 py-2.5 px-14 text-xl",
			"2xl": "group-hover:translate-y-2 py-4 px-16 text-2xl",
		};

		const generateButtonSizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
			sm: "before:top-1",
			md: "before:top-1.5",
			lg: "before:top-1.5",
			xl: "before:top-1.5",
			"2xl": "before:top-2",
		};

		return (
			<button
				className={clsx(
					"group relative p-0 border-0 border-none bg-transparent box-border cursor-pointer before:content-[''] before:absolute before:left-0 before:z-[1] before:w-full before:h-full before:rounded-xl",
					fullWidth ? "w-full" : "w-max",
					generateButtonClasses(color, variant),
					generateButtonSizeClasses[size]
				)}
				disabled={isDisabled}
				onClick={onClick}
			>
				<span
					className={clsx(
						className,
						generateSpanClasses(color, variant),
						generateSpanSizeClasses[size],
						"flex justify-center items-center relative z-[2] border-4 rounded-xl w-full h-full transition-transform duration-200 ease-linear gap-2 min-w-full"
					)}
				>
					{startIcon && startIcon}
					{children}
				</span>
			</button>
		);
	} else {
		const MapSolidClasses: Record<NonNullable<ButtonProps["color"]>, string> = {
			default:
				"border-dark bg-dark text-light hover:bg-dark/90 hover:border-dark/40 transition-all duration-300 ease-in-out",
			primary:
				"border-primary bg-primary text-light hover:bg-primary/95 hover:border-primary/40 transition-all duration-300 ease-in-out",
			secondary:
				"border-secondary bg-secondary text-light hover:bg-secondary/95 hover:border-secondary/40 transition-all duration-300 ease-in-out",
			danger: "border-2 border-danger bg-danger text-light hover:bg-danger/95 hover:border-danger/40 transition-all duration-300 ease-in-out",
			warning:
				"border-warning bg-warning text-light hover:bg-warning/95 hover:border-warning/40 transition-all duration-300 ease-in-out",
			success:
				"border-success bg-success text-light hover:bg-success/95 hover:border-success/40 transition-all duration-300 ease-in-out",
		};

		const MapBorderedClasses: Record<NonNullable<ButtonProps["color"]>, string> = {
			default:
				"border-dark bg-white text-dark hover:text-light hover:bg-dark transition-colors duration-300 ease-in-out",
			primary:
				"border-primary bg-white text-primary hover:text-light hover:bg-primary transition-all duration-300 ease-in-out",
			secondary:
				"border-secondary bg-white text-secondary hover:text-light hover:bg-secondary transition-all duration-300 ease-in-out",
			danger: "border-danger bg-white text-danger hover:text-light hover:bg-danger transition-all duration-300 ease-in-out",
			warning:
				"border-warning bg-white text-warning hover:text-light hover:bg-warning transition-all duration-300 ease-in-out",
			success:
				"border-success bg-white text-success hover:text-light hover:bg-success transition-all duration-300 ease-in-out",
		};

		const MapLightClasses: Record<NonNullable<ButtonProps["color"]>, string> = {
			default: "border-none text-dark hover:bg-dark-50 transition-all duration-300 ease-in-out",
			primary: "border-none text-primary hover:bg-primary-50 transition-all duration-300 ease-in-out",
			secondary: "border-none text-primary hover:bg-secondary-50 transition-all duration-300 ease-in-out",
			danger: "border-none text-primary hover:bg-danger-50 transition-all duration-300 ease-in-out",
			warning: "border-none text-primary hover:bg-warning-50 transition-all duration-300 ease-in-out",
			success: "border-none text-primary hover:bg-success-50 transition-all duration-300 ease-in-out",
		};

		const MapDivClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
			solid: MapSolidClasses[color],
			bordered: MapBorderedClasses[color],
			light: MapLightClasses[color],
			"bordered-3d": "",
			"solid-3d": "",
		};

		const MapTextSize: Record<NonNullable<ButtonProps["size"]>, string> = {
			sm: "border rounded-xl text-sm py-1.5 px-4",
			md: "border-2 rounded-xl text-base py-2 px-6",
			lg: "border-3 rounded-xl text-lg py-2.5 px-8",
			xl: "border-4 rounded-xl text-xl py-4 px-10",
			"2xl": "border-4 rounded-xl text-2xl py-4 px-12",
		};

		const MapIconSize: Record<NonNullable<ButtonProps["size"]>, string> = {
			sm: "border rounded-xl text-sm p-2",
			md: "border-2 rounded-xl text p-2",
			lg: "border-3 rounded-2xl text-lg p-2.5",
			xl: "border-4 rounded-2xl text-xl p-3",
			"2xl": "border-4 rounded-2xl text-2xl p-4",
		};

		return (
			<div
				onClick={onClick}
				className={clsx(
					className,
					MapDivClasses[variant],
					isIconOnly ? MapIconSize[size] : MapTextSize[size],
					"flex justify-center items-center gap-2 cursor-pointer h-max",
					{
						"w-full": fullWidth,
						"w-max": !fullWidth,
						"!bg-transparent !p-2": !showBackground,
					}
				)}
			>
				{startIcon && startIcon}
				{!isIconOnly && children}
				{endIcon && endIcon}
			</div>
		);
	}
};

export default Button;
