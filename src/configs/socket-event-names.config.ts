const SOCKET_EVENT_NAMES = {
	UPDATE_ROOM_CONFIG: {
		SEND: "updateRoomConfig",
		RECEIVE: "roomConfigUpdated",
	},
	CREATE_RESULT: {
		SEND: "createNewResult",
		RECEIVE: "newResultCreated",
	},
	DELETE_MATCH_RESULTS: {
		SEND: "deleteMatchResults",
		RECEIVE: "matchResultsDeleted",
	},
	CREATE_NEW_ROOM: {
		SEND: "createNewRoom",
		RECEIVE: "roomCreated",
	},
	CLOSE_ROOM: {
		SEND: "closeRoom",
		RECEIVE: "roomClosed",
	},
	JOIN_CARDGAME_ROOM: "joinCGRoom",
	LEAVE_CARDGAME_ROOM: "outCGRoom",
	PLAYER_CHANGE: "playerChange",
};

export default SOCKET_EVENT_NAMES;
