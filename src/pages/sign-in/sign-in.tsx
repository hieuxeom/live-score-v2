import { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../../components/button";
import Input from "../../components/input";
import Typography from "../../components/typography";
import Wrapper from "../../components/wrapper";
import ROUTE_PATH from "../../configs/routes.config";
import useAxios from "../../hooks/useAxios";
import { TSignIn, TSignInResponse } from "../../types/auth";
import { IAPIResponse } from "../../types/general";
import API_ROUTES from "../../configs/api-routes.config";

// interface SignInProps {}

const SignIn = () => {
	const navigate = useNavigate();
	const axios = useAxios();

	const [, setCookies] = useCookies(["access_token", "refresh_token", "email", "user_id"]);

	const [signInForm, setSignInForm] = useState<TSignIn>({
		email: "",
		password: "",
	});

	const handleSignIn = () => {
		const myFn = axios
			.post<IAPIResponse<TSignInResponse>>(API_ROUTES.ACCOUNT.SIGN_IN, signInForm)
			.then((response) => response.data)
			.then((response) => {
				setCookies("access_token", response.results.access_token, { maxAge: 10 });
				setCookies("refresh_token", response.results.refresh_token, { maxAge: 60 * 60 * 24 });
				setCookies("email", response.results.email, { maxAge: 60 * 60 * 24 });
				setCookies("user_id", response.results.user_id, { maxAge: 60 * 60 * 24 });
				navigate(ROUTE_PATH.HOME);
			});

		toast.promise(myFn, {
			loading: "Signing in...",
			success: "Signed in successfully",
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
					alt=""
					className={"drop-shadow-2xl"}
				/>
			</div>

			<form
				className={"w-full max-w-2xl bg-light flex flex-col gap-4 p-8 rounded-3xl shadow-lg h-max"}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSignIn();
					}
				}}
			>
				<Typography
					type={"h2"}
					className={"text-primary uppercase !font-black"}
				>
					Sign in to your account
				</Typography>
				<Input
					label={"Your email"}
					name={"email"}
					value={signInForm.email}
					onChange={(e) => setSignInForm((prev) => ({ ...prev, email: e.target.value }))}
				/>
				<Input
					label={"Password"}
					name={"password"}
					value={signInForm.password}
					onChange={(e) => setSignInForm((prev) => ({ ...prev, password: e.target.value }))}
				/>
				<div className={"flex items-center justify-between"}>
					<div className={"flex items-center gap-2"}>
						<Typography>Don't have an account yet?</Typography>
						<Button
							variant={"light"}
							color={"primary"}
							showBackground={false}
							onClick={() => navigate(ROUTE_PATH.AUTH.SIGN_UP)}
						>
							Sign up
						</Button>
					</div>
					<Button
						size={"md"}
						color={"primary"}
						onClick={handleSignIn}
					>
						Create an account
					</Button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SignIn;
