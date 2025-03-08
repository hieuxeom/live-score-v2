const SOCKET_EVENT_NAMES = {
    UPDATE_ROOM_CONFIG: {
        SEND: "updateRoomConfig",
        RECEIVE: "roomConfigUpdated",
        ERROR: "errorUpdateRoomConfig",
    },
    CREATE_RESULT: {
        SEND: "createNewResult",
        RECEIVE: "newResultCreated",
        ERROR: "errorCreateNewResult",
    },
    DELETE_MATCH_RESULTS: {
        SEND: "deleteMatchResult",
        RECEIVE: "matchResultsDeleted",
        ERROR: "errorDeleteMatchResult",
    },
    CREATE_NEW_ROOM: {
        SEND: "createNewRoom",
        RECEIVE: "roomCreated",
    },
    CLOSE_ROOM: {
        SEND: "closeRoom",
        RECEIVE: "roomClosed",
        ERROR: "errorCloseRoom",
    },
    REOPEN_ROOM: {
        SEND: "reOpenRoom",
        RECEIVE: "roomReOpened",
        ERROR: "errorReOpenRoom",
    },
    JOIN_CARDGAME_ROOM: "joinCGRoom",
    LEAVE_CARDGAME_ROOM: "outCGRoom",
    PLAYER_CHANGE: "playerChange",
};

export default SOCKET_EVENT_NAMES;
