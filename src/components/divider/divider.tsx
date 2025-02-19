import clsx from "clsx";

interface DividerProps {
	className?: string;
}

const Divider = ({ className }: DividerProps) => <hr className={clsx("my-4 border-dark/50", className)}></hr>;

export default Divider;
