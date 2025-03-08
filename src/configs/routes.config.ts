const ROUTE_PATH = {
	HOME: "/",
	BADMINTON: {
		INDEX: "/badminton",
		TOUR_INFO: (tourId: string | number) => `/badminton/${tourId}`,
		CREATE_NEW_TOUR: "/badminton/new",
		TOUR_CONFIG: (tourId: string | number) => `/badminton/${tourId}/config`,
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
