import REGEX_CONFIG from "../configs/regex.config";

export const validateEmail = (email: string): boolean => {
	return REGEX_CONFIG.EMAIL.test(email);
};

export const validatePassword = (password: string): boolean => {
	return REGEX_CONFIG.PASSWORD.test(password);
};

export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
	return password === confirmPassword;
};
