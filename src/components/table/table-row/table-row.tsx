interface TableRowProps {
	className?: string;
	children: React.ReactNode;
}

const TableRow = ({ className, children }: TableRowProps) => <tr className={className}>{children}</tr>;

TableRow.defaultProps = {};

export default TableRow;
