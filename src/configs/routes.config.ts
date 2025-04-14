const ROUTE_PATH = {
    HOME: "/",
    GAME_ROOM: (roomId: string | number) => `/${roomId}`,
    CREATE_NEW_ROOM: "/new",
    AUTH: {
        SIGN_IN: "/sign-in",
        SIGN_UP: "/sign-up",
        SIGN_OUT: "/sign-out",
    },
};

export default ROUTE_PATH;
