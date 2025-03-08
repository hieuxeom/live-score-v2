const API_ENDPOINTS = {
    GAME_CARD: `game-card`,
    BADMINTON: `badminton`,
    ACCOUNT: `accounts`,
};

const API_ROUTES = {
    GAME_CARD: {
        GET_ALL_ROOMS: `/${API_ENDPOINTS.GAME_CARD}`,
        GET_ROOM_DETAILS: (roomId: string | number) => `/${API_ENDPOINTS.GAME_CARD}/${roomId}`,
        CREATE_ROOM: `/${API_ENDPOINTS.GAME_CARD}`,
        UPDATE_ROOM_CONFIG: (roomId: string | number) => `/${API_ENDPOINTS.GAME_CARD}/${roomId}`,
        CREATE_MATCH_RESULT: (roomId: string | number) => `/${API_ENDPOINTS.GAME_CARD}/${roomId}/match-results`,
        GET_ROOM_RESULTS: (roomId: string | number) => `${API_ENDPOINTS.GAME_CARD}/${roomId}/results`,
        CLOSE_ROOM: (roomId: string | number) => `${API_ENDPOINTS.GAME_CARD}/${roomId}/close-room`,
    },
    BADMINTON: {
        GET_ALL_TOURS: `/${API_ENDPOINTS.BADMINTON}`,
        GET_TOUR_INFO: (tourId: string | number) => `/${API_ENDPOINTS.BADMINTON}/tournaments/${tourId}`,
        UPDATE_TOUR_INFO: (tourId: string | number) => `/${API_ENDPOINTS.BADMINTON}/tournaments/${tourId}`,
        GET_TOUR_TEAMS: (tourId: string | number) => `/${API_ENDPOINTS.BADMINTON}/tournaments/${tourId}/teams`,
        ADD_TEAMS_TO_TOUR: (tourId: string | number) => `/${API_ENDPOINTS.BADMINTON}/tournaments/${tourId}/teams`,
        DELETE_TEAM_FROM_TOUR: (tourId: string | number, playerId: string | number) => `/${API_ENDPOINTS.BADMINTON}/tournaments/${tourId}/teams/${playerId}`,
        NEW_TOUR: `/${API_ENDPOINTS.BADMINTON}`,
        GET_ALL_PLAYERS: `/${API_ENDPOINTS.BADMINTON}/players`,
        GET_ALL_TEAMS: `/${API_ENDPOINTS.BADMINTON}/teams`,
        CREATE_NEW_PLAYER: `/${API_ENDPOINTS.BADMINTON}/players`,
        UPDATE_PLAYER_INFO: (playerId: string | number) => `/${API_ENDPOINTS.BADMINTON}/players/${playerId}`,
        DELETE_PLAYER: (playerId: string | number) => `/${API_ENDPOINTS.BADMINTON}/players/${playerId}`,
        GET_ALL_TOUR_DRAWS: (tourId: string | number) => `/${API_ENDPOINTS.BADMINTON}/tournaments/${tourId}/draws`,
        CREATE_NEW_TOUR_DRAW: (tourId: string | number) => `/${API_ENDPOINTS.BADMINTON}/tournaments/${tourId}/draws`,
        GET_DRAW_INFO: (tourId: string | number, drawId: string | number) => `/${API_ENDPOINTS.BADMINTON}/tournaments/${tourId}/draws/${drawId}`
    },
    ACCOUNT: {
        SIGN_UP: `/${API_ENDPOINTS.ACCOUNT}/sign-up`,
        SIGN_IN: `/${API_ENDPOINTS.ACCOUNT}/sign-in`,
        EMAIL_CHECK: `/${API_ENDPOINTS.ACCOUNT}/check`,
    },
};

export default API_ROUTES;
