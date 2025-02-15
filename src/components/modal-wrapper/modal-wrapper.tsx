import React from "react";

import clsx from "clsx";
import "./modal.css";
import Typography from "../typography";
import Button from "../button";
import ICON_CONFIG from "../../configs/icon.config";

interface ModalWrapperProps {
	title: string;
	isShowModal: boolean;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

const ModalWrapper = ({ title, isShowModal = false, setIsShowModal, children }: ModalWrapperProps) => {
	return (
		<>
			<div
				className={clsx("backdrop z-10 absolute top-0 left-0 w-full h-full bg-gray-300/40", {
					showBackdrop: isShowModal,
				})}
				onClick={() => setIsShowModal(false)}
			></div>
			<div
				className={clsx("modal absolute z-20 w-full h-full flex items-center justify-center gap-4", {
					showModal: isShowModal,
				})}
			>
				<div
					className={
						"relative w-3/4 h-max bg-white px-6 py-4 rounded-2xl shadow-2xl border-b-primary border-b-8 border-2 border-primary"
					}
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
