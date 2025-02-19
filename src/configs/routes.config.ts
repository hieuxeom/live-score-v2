const ROUTE_PATH = {
	HOME: "/",
	BADMINTON: {
		INDEX: "/badminton",
		ROOM: (roomId: string | number) => `/badminton/${roomId}`,
		CREATE_NEW_ROOM: "/badminton/new",
	},
	CARD_GAME: {
		INDEX: "/card-game",
		GAME_ROOM: (roomId: string | number) => `/card-game/${roomId}`,
		CREATE_NEW_ROOM: "/card-game/new",
	},
	AUTH: {
		SIGN_IN: "/sign-in",
		SIGN_UP: "/sign-up",
		SIGN_OUT: "/sign-out",
	},
};

export default ROUTE_PATH;
