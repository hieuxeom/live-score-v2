export type TSignUp = {
	email: string | null;
	username: string | null;
	password: string;
	confirm_password: string;
};

export type TSignIn = Omit<TSignUp, "confirm_password">;

export type TSignInResponse = {
	access_token: string;
	refresh_token: string;

	username: string;
	user_id: string;
};

export type TEmailCheckResponse = {
	isValid: boolean;
	emailInfo: {
		email: string;
		username: string;
	};
};
