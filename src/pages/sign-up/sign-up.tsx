import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../../components/button";
import Typography from "../../components/typography";
import Wrapper from "../../components/wrapper";
import ROUTE_PATH from "../../configs/routes.config";
import useAxios from "../../hooks/useAxios";
import API_ROUTES from "../../configs/api-routes.config";
import { TSignUp } from "../../types/auth";
import Input from "../../components/input";

// interface SignUpProps {}

const SignUp = () => {
	const navigate = useNavigate();
	const axios = useAxios();

	const [signUpForm, setSignUpForm] = useState<TSignUp>({
		email: "",
		password: "",
		confirm_password: "",
	});

	const handleSignUp = () => {
		const myFn = axios
			.post(API_ROUTES.ACCOUNT.SIGN_UP, signUpForm)
			.then((response) => response.data)
			.then(() => {
				navigate(ROUTE_PATH.AUTH.SIGN_IN);
			});

		toast.promise(myFn, {
			loading: "Creating account...",
			success: "Account created successfully",
			error: (error: any) => error.response.data.message,
		});
	};

	return (
		<Wrapper
			size={"screen"}
			orientation={"vertical"}
			centerX
			centerY
		>
			<div
				className={"w-96 my-4"}
				onClick={() => navigate(ROUTE_PATH.HOME)}
			>
				<img
					src="/logow_w.png"
					alt="logos"
					className={"drop-shadow-2xl"}
				/>
			</div>

			<form
				className={"w-full max-w-2xl bg-light flex flex-col gap-4 p-8 rounded-3xl shadow-lg h-max"}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSignUp();
					}
				}}
			>
				<Typography
					type={"h2"}
					className={"text-primary uppercase !font-black"}
				>
					Create an account
				</Typography>
				<Input
					label={"Your email"}
					name={"email"}
					value={signUpForm.email}
					onChange={(e) => setSignUpForm((prev) => ({ ...prev, email: e.target.value }))}
				/>
				<Input
					label={"Password"}
					name={"password"}
					value={signUpForm.password}
					onChange={(e) => setSignUpForm((prev) => ({ ...prev, password: e.target.value }))}
				/>
				<Input
					label={"Confirm password"}
					name={"confirm_password"}
					value={signUpForm.confirm_password}
					onChange={(e) => setSignUpForm((prev) => ({ ...prev, confirm_password: e.target.value }))}
				/>
				<div className={"flex items-center justify-between"}>
					<div className={"flex items-center gap-2"}>
						<Typography>Already have an account?</Typography>
						<Button
							variant={"light"}
							color={"primary"}
							showBackground={false}
							onClick={() => navigate(ROUTE_PATH.AUTH.SIGN_IN)}
						>
							Login here
						</Button>
					</div>
					<Button
						size={"md"}
						color={"primary"}
						onClick={handleSignUp}
					>
						Create an account
					</Button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SignUp;
