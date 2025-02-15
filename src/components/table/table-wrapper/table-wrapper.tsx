import clsx from "clsx";

interface TableWrapperProps {
	className?: string;
	children: React.ReactNode;
}

const TableWrapper = ({ className, children }: TableWrapperProps) => {
	return <table className={clsx(className)}>{children}</table>;
};

TableWrapper.defaultProps = {};

export default TableWrapper;
