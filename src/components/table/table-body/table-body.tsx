import clsx from "clsx";
import { Children } from "react";

interface TableBodyProps {
	className?: string;
	emptyMessage: React.ReactNode | string;
	children: React.ReactNode;
}

const TableBody = ({ className, emptyMessage, children }: TableBodyProps) => {
	const arrChildren = Children.toArray(children);

	if (arrChildren.length === 0) {
		return (
			<tbody className={className}>
				<tr>
					<td
						colSpan={100}
						className={clsx("text-center h-max", {
							italic: typeof emptyMessage === "string",
						})}
					>
						{emptyMessage}
					</td>
				</tr>
			</tbody>
		);
	}

	return <tbody className={className}>{children}</tbody>;
};

TableBody.defaultProps = {
	emptyMessage: "No data",
};

export default TableBody;
