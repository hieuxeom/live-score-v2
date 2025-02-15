const API_ENDPOINTS = {
	GAME_CARD: `game-card`,
	ACCOUNT: `accounts`,
};

const API_ROUTES = {
	GAME_CARD: {
		GET_ALL_ROOMS: `/${API_ENDPOINTS.GAME_CARD}`,
		GET_ROOM_DETAILS: (roomId: string | number) => `/${API_ENDPOINTS.GAME_CARD}/${roomId}`,
		GET_ROOM_MATCH_RESULTS: (roomId: string | number) => `/${API_ENDPOINTS.GAME_CARD}/${roomId}/match-results`,
		CREATE_ROOM: `/${API_ENDPOINTS.GAME_CARD}`,
		UPDATE_ROOM_CONFIG: (roomId: string | number) => `/${API_ENDPOINTS.GAME_CARD}/${roomId}`,
		CREATE_MATCH_RESULT: (roomId: string | number) => `/${API_ENDPOINTS.GAME_CARD}/${roomId}/match-results`,
		GET_ROOM_RESULTS: (roomId: string | number) => `${API_ENDPOINTS.GAME_CARD}/${roomId}/results`,
		CLOSE_ROOM: (roomId: string | number) => `${API_ENDPOINTS.GAME_CARD}/${roomId}/close-room`,
	},
	ACCOUNT: {
		SIGN_UP: `/${API_ENDPOINTS.ACCOUNT}/sign-up`,
		SIGN_IN: `/${API_ENDPOINTS.ACCOUNT}/sign-in`,
	},
};

export default API_ROUTES;
