interface TableHeaderProps {
	className?: string;
	children: React.ReactNode;
}

const TableHeader = ({ className, children }: TableHeaderProps) => <thead className={className}>{children}</thead>;

TableHeader.defaultProps = {};

export default TableHeader;
