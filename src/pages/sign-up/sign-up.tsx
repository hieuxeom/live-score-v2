import { useEffect, useState } from "react";
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
import clsx from "clsx";
import { TBaseVariants } from "../../types/general";

// interface SignUpProps {}

const SignUp = () => {
	const navigate = useNavigate();
	const axios = useAxios();

	const [signUpForm, setSignUpForm] = useState<TSignUp>({
		email: "",
		username: null,
		password: "",
		confirm_password: "",
	});

	const [currentSignUpMethod, setCurrentSignUpMethod] = useState<"email" | "username">("email");

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

	const handleChangeSignUpMethod = () => {
		if (currentSignUpMethod === "email") {
			setCurrentSignUpMethod("username");
			setSignUpForm((prev) => ({ ...prev, email: null }));
		} else {
			setCurrentSignUpMethod("email");
			setSignUpForm((prev) => ({ ...prev, username: null }));
		}
	};

	useEffect(() => {
		console.log(signUpForm);
	}, [signUpForm]);

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
					Đăng kí tài khoản mới
				</Typography>
				<div className={"flex items-center"}>
					<Button
						fullWidth
						className={"rounded-tr-none rounded-br-none border-r-none"}
						color={"secondary"}
						variant={
							clsx({
								solid: currentSignUpMethod === "email",
								bordered: currentSignUpMethod !== "email",
							}) as TBaseVariants
						}
						onClick={handleChangeSignUpMethod}
					>
						Đăng kí bằng Email
					</Button>
					<Button
						fullWidth
						className={"rounded-tl-none rounded-bl-none !border-l-0"}
						color={"secondary"}
						variant={
							clsx({
								solid: currentSignUpMethod === "username",
								bordered: currentSignUpMethod !== "username",
							}) as TBaseVariants
						}
						onClick={handleChangeSignUpMethod}
					>
						Đăng kí bằng Username
					</Button>
				</div>
				{currentSignUpMethod === "email" ? (
					<Input
						label={"Email"}
						name={"email"}
						value={signUpForm.email || ""}
						onChange={(e) => setSignUpForm((prev) => ({ ...prev, email: e.target.value }))}
					/>
				) : (
					<Input
						label={"Username"}
						name={"username"}
						value={signUpForm.username || ""}
						onChange={(e) => setSignUpForm((prev) => ({ ...prev, username: e.target.value }))}
					/>
				)}

				<Input
					type={"password"}
					label={"Mật khẩu"}
					name={"password"}
					value={signUpForm.password}
					onChange={(e) => setSignUpForm((prev) => ({ ...prev, password: e.target.value }))}
				/>
				<Input
					type={"password"}
					label={"Nhập lại mật khẩu"}
					name={"confirm_password"}
					value={signUpForm.confirm_password}
					onChange={(e) => setSignUpForm((prev) => ({ ...prev, confirm_password: e.target.value }))}
				/>
				<div className={"flex items-center justify-between"}>
					<div className={"flex items-center gap-2"}>
						<Typography>Bạn đã có tài khoản?</Typography>
						<Button
							variant={"light"}
							color={"primary"}
							showBackground={false}
							onClick={() => navigate(ROUTE_PATH.AUTH.SIGN_IN)}
						>
							Đăng nhập ngay
						</Button>
					</div>
					<Button
						size={"md"}
						color={"primary"}
						onClick={handleSignUp}
					>
						Tạo tài khoản
					</Button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SignUp;
