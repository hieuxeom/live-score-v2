import { useEffect } from "react";
import { useNavigate } from "react-router";

interface RedirectProps {
	to: string;
}

const Redirect = ({ to }: RedirectProps) => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate(to);
	}, []);

  return <></>
};

export default Redirect;
