import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface CustomHelmetProps {
	title: string;
	description: string;
	keywords: string[];
	author?: string;
}

const CustomHelmet = ({ title, description, keywords, author }: CustomHelmetProps) => {
	return (
		<Helmet>
			<title>hieutndev | {title}</title>
			<meta
				name="description"
				content={description}
			/>
			<meta
				name="keywords"
				content={keywords && keywords.join(", ")}
			/>
			<meta
				name="author"
				content={author || "Tran Ngoc Hieu"}
			/>
		</Helmet>
	);
};

export default CustomHelmet;
