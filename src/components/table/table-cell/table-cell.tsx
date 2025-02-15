import clsx from "clsx";

interface TableCellProps {
	isHeader: boolean;
	className?: string;
	borderType:
		| "top"
		| "top-left"
		| "top-bottom"
		| "top-right"
		| "left"
		| "left-right"
		| "right"
		| "bottom"
		| "bottom-left"
		| "bottom-right"
		| "full"
		| "none";

	children: React.ReactNode;
}

const TableCell = ({ borderType, isHeader, className, children }: TableCellProps) => {
	const MapBorderClasses: Record<TableCellProps["borderType"], string> = {
		top: "border-t",
		"top-left": "border-t border-l",
		"top-bottom": "border-t border-b",
		"top-right": "border-t border-r",
		left: "border-l",
		"left-right": "border-l border-r",
		right: "border-r",
		bottom: "border-b",
		"bottom-left": "border-b border-l",
		"bottom-right": "border-b border-r",
		full: "border",
		none: "border-none",
	};

	if (isHeader) {
		return <th className={clsx("px-4 py-2", MapBorderClasses[borderType], className)}>{children}</th>;
	}
	return <td className={clsx("px-4 py-2", MapBorderClasses[borderType], className)}>{children}</td>;
};

TableCell.defaultProps = {
	isHeader: false,
	borderType: "none",
};

export default TableCell;
