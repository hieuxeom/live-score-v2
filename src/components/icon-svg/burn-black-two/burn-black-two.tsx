interface BurnBlackTwoProps {
	size?: number;
}

const BurnBlackTwo = ({ size = 40 }: BurnBlackTwoProps) => (
	<svg
		width={size}
		height={size}
		fill="#292929"
		opacity={0.25}
		viewBox="0 0 256 256"
		id="Flat"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g
			id="SVGRepo_bgCarrier"
			strokeWidth="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			{" "}
			<path d="M208,32H48A16.01833,16.01833,0,0,0,32,48V208a16.01833,16.01833,0,0,0,16,16H208a16.01833,16.01833,0,0,0,16-16V48A16.01833,16.01833,0,0,0,208,32ZM152,167.99414a8,8,0,0,1,0,16H104.31738c-.10644.0044-.21191.00635-.31836.00635a8.00251,8.00251,0,0,1-6.30078-12.93164L141.37012,112.793a16.0039,16.0039,0,1,0-28.11621-15.01856A8,8,0,1,1,98.51758,91.542a32.00411,32.00411,0,1,1,56.01269,30.35547c-.07324.10791-.14843.21436-.22754.31836l-34.30566,45.77832Z"></path>{" "}
		</g>
	</svg>
);

export default BurnBlackTwo;
