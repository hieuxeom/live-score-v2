const REGEX_CONFIG = {
	EMAIL: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
	PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};

export default REGEX_CONFIG;
