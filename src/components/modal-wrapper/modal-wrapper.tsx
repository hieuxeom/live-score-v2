import React from "react";

import clsx from "clsx";
import "./modal.css";
import Typography from "../typography";
import Button from "../button";
import ICON_CONFIG from "../../configs/icon.config";
import { TBaseSize } from "../../types/general";

interface ModalWrapperProps {
	width?: TBaseSize;
	title: string;
	isShowModal: boolean;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	classNames?: {
		backdrop?: string;
		modal?: string;
	};
	children: React.ReactNode;
}

const ModalWrapper = ({
	width = "7xl",
	title,
	isShowModal = false,
	setIsShowModal,
	classNames,
	children,
}: ModalWrapperProps) => {
	const MapWidthSize: Record<TBaseSize, string> = {
		xs: "w-full max-w-xs",
		sm: "w-full max-w-sm",
		md: "w-full max-w-md",
		lg: "w-full max-w-lg",
		xl: "w-full max-w-xl",
		"2xl": "w-full max-w-2xl",
		"3xl": "w-full max-w-3xl",
		"4xl": "w-full max-w-4xl",
		"5xl": "w-full max-w-5xl",
		"6xl": "w-full max-w-6xl",
		"7xl": "w-full max-w-7xl",
		"8xl": "w-full max-w-8xl",
		full: "w-full",
	};

	return (
		<>
			<div
				className={clsx(
					"backdrop z-10 absolute top-0 left-0 w-full h-full bg-gray-300/40",
					classNames && classNames.backdrop,
					{
						showBackdrop: isShowModal,
					}
				)}
				onClick={() => setIsShowModal(false)}
			></div>
			<div
				className={clsx(
					"modal absolute z-20 w-full h-full flex top-16 justify-center gap-4",
					classNames && classNames.modal,
					{
						showModal: isShowModal,
					}
				)}
			>
				<div
					className={clsx(
						"relative h-max bg-white px-6 py-4 rounded-2xl shadow-2xl border-b-primary border-b-8 border-2 border-primary",
						MapWidthSize[width]
					)}
				>
					<div className={"w-full flex justify-between items-center"}>
						<Typography type={"h2"}>{title}</Typography>
						<Button
							isIconOnly={true}
							color={"danger"}
							size={"2xl"}
							className={"group"}
							variant={"light"}
							onClick={() => setIsShowModal(false)}
							startIcon={ICON_CONFIG.CLOSE}
							showBackground={false}
						></Button>
					</div>
					{children}
				</div>
			</div>
		</>
	);
};

export default ModalWrapper;
