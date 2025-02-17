import clsx from "clsx";
import { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../../components/button";
import Input from "../../components/input";
import Typography from "../../components/typography";
import Wrapper from "../../components/wrapper";
import API_ROUTES from "../../configs/api-routes.config";
import ROUTE_PATH from "../../configs/routes.config";
import useAxios from "../../hooks/useAxios";
import { TSignIn, TSignInResponse } from "../../types/auth";
import { IAPIResponse, TBaseVariants } from "../../types/general";
import { validateEmail } from "../../utils/validations";

// interface SignInProps {}

const SignIn = () => {
	const navigate = useNavigate();
	const axios = useAxios();

	const [, setCookies] = useCookies(["access_token", "refresh_token", "username", "user_id"]);

	const [signInForm, setSignInForm] = useState<TSignIn>({
		email: "",
		username: null,
		password: "",
	});

	const [currentSignInMethod, setCurrentSignInMethod] = useState<"email" | "username">("email");

	const handleSignIn = () => {
		const myFn = axios
			.post<IAPIResponse<TSignInResponse>>(API_ROUTES.ACCOUNT.SIGN_IN, signInForm)
			.then((response) => response.data)
			.then((response) => {
				setCookies("access_token", response.results.access_token, { maxAge: 10 });
				setCookies("refresh_token", response.results.refresh_token, { maxAge: 60 * 60 * 24 });
				setCookies("username", response.results.username, { maxAge: 60 * 60 * 24 });
				setCookies("user_id", response.results.user_id, { maxAge: 60 * 60 * 24 });
				navigate(ROUTE_PATH.HOME);
			});

		toast.promise(myFn, {
			loading: "Signing in...",
			success: "Signed in successfully",
			error: (error: any) => error.response.data.message,
		});
	};

	const handleChangeSignInMethod = () => {
		if (currentSignInMethod === "email") {
			setCurrentSignInMethod("username");
			setSignInForm((prev) => ({ ...prev, email: null }));
		} else {
			setCurrentSignInMethod("email");
			setSignInForm((prev) => ({ ...prev, username: null }));
		}
	};

	const validSignInForm = () => {
		if (currentSignInMethod === "email") {
			if (!signInForm.email || !signInForm.password) {
				return false;
			}
		} else {
			if (!signInForm.username || !signInForm.password) {
				return false;
			}
		}
		return true;
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
					Đăng nhập
				</Typography>
				<div className={"flex items-center"}>
					<Button
						fullWidth
						className={"rounded-tr-none rounded-br-none border-r-none"}
						color={"secondary"}
						variant={
							clsx({
								solid: currentSignInMethod === "email",
								bordered: currentSignInMethod !== "email",
							}) as TBaseVariants
						}
						onClick={handleChangeSignInMethod}
					>
						Đăng nhập bằng Email
					</Button>
					<Button
						fullWidth
						className={"rounded-tl-none rounded-bl-none !border-l-0"}
						color={"secondary"}
						variant={
							clsx({
								solid: currentSignInMethod === "username",
								bordered: currentSignInMethod !== "username",
							}) as TBaseVariants
						}
						onClick={handleChangeSignInMethod}
					>
						Đăng nhập bằng Username
					</Button>
				</div>
				{currentSignInMethod === "email" ? (
					<Input
						label={"Email"}
						name={"email"}
						value={signInForm.email || ""}
						onChange={(e) => setSignInForm((prev) => ({ ...prev, email: e.target.value }))}
						validator={validateEmail}
						errorMessage={"Email không hợp lệ"}
					/>
				) : (
					<Input
						label={"Username"}
						name={"username"}
						value={signInForm.username || ""}
						onChange={(e) => setSignInForm((prev) => ({ ...prev, username: e.target.value }))}
					/>
				)}
				<Input
					type={"password"}
					label={"Mật khẩu"}
					name={"password"}
					value={signInForm.password}
					onChange={(e) => setSignInForm((prev) => ({ ...prev, password: e.target.value }))}
				/>
				<div className={"flex items-center justify-between"}>
					<div className={"flex items-center gap-2"}>
						<Typography>Bạn chưa có tài khoản?</Typography>
						<Button
							variant={"light"}
							color={"primary"}
							showBackground={false}
							onClick={() => navigate(ROUTE_PATH.AUTH.SIGN_UP)}
						>
							Đăng kí tại đây
						</Button>
					</div>
					<Button
						size={"md"}
						color={"primary"}
						onClick={handleSignIn}
						isDisabled={!validSignInForm()}
					>
						Đăng nhập ngay
					</Button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SignIn;
