interface XSymbolProps {
	size: string | number;
	color: string;
	className?: string;
	xClass?: string;
}

const XSymbol = ({ xClass, className, size, color }: XSymbolProps) => (
	<svg
		width={`${size}px`}
		height={`${size}px`}
		viewBox="0 0 1024 1024"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		fill={`${color}`}
	>
		<g
			id="SVGRepo_bgCarrier"
			stroke-width="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			<path
				className={xClass}
				fill={`${color}`}
				d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
			></path>
		</g>
	</svg>
);

XSymbol.defaultProps = {
	size: 40,
	color: "#000000",
};

export default XSymbol;
