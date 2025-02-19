export type TGameCardRoom = {
	room_id: number;
	created_by: number;
	email: string;
	created_at: string;
	updated_at: string;
	is_closed: number;
	is_deleted: number;
};

export type TGameCardRoomConfig = {
	first: number;
	second: number;
	third: number;
	fourth: number;
	red_two: number;
	black_two: number;
	burnt_out: number;
	swept_out: number;
	player1_name: string;
	player2_name: string;
	player3_name: string;
	player4_name: string;
};

export type TRoomInfo = TGameCardRoom & TGameCardRoomConfig & { username: string };

export type TGameCardMatchHistory = {
	room_id: number;
	match_id: number;
	created_at: string;
	updated_at: string;
	player_index: number;
	rank: number;
	win_all: boolean;
	burnt_out: boolean;
	swept_out: boolean;
};

export type TGameCardPlayerResult = {
	player_index: number;
	rank: number;
	win_all: number;
	burnt_out: number;
	swept_out: number;
};

export type TGameCardNewPlayerResult = Omit<TGameCardPlayerResult, "player_index">;

export type TGameCardNewResult = {
	matchId: number;
	player1Result: TGameCardNewPlayerResult | null;
	player2Result: TGameCardNewPlayerResult | null;
	player3Result: TGameCardNewPlayerResult | null;
	player4Result: TGameCardNewPlayerResult | null;
	twoPlayResults: Omit<TGameCardTwoPlayResult, "result_id" | "match_id">[];
};

export type TGameCardScoreBoard = {
	totalScore: {
		player1: number;
		player2: number;
		player3: number;
		player4: number;
	};
	matrixScore: [
		[null, number, number, number],
		[number, null, number, number],
		[number, number, null, number],
		[number, number, number, null]
	];
};

export type TGameCardHistoryScoreBoard = number[][];

export type TGameCardRoomResults = {
	scoreBoard: TGameCardScoreBoard;
	historyScoreBoard: TGameCardHistoryScoreBoard;
	playHistory: TGameCardPlayHistory;
};

export type TGameCardTwoPlayResult = {
	result_id: number;
	match_id: number;
	two_color: "red" | "black";
	taker: number;
	burner: number;
	quantity: number;
};

export type TGameCardPlayHistory = {
	matchResults: IMatchHistory[];
	twoPlayResults: TGameCardTwoPlayResult[];
};

export type TGameCardSocketPlayerChange = {
	newJoin: string;
	newLeave: string;
	currentInRoom: number;
	playersInRoom: string[];
};

export type TGameCardSocketRoomCreated = {
	listRooms: TRoomInfo[];
	newRoomId: string;
};

export type TGameCardSocketNewResult = {
	createdBy: string;
	roomResults: TGameCardRoomResults;
};

export type TGameCardSocketDeleteResult = {
	deleteBy: string;
	roomResults: TGameCardRoomResults;
};

export type TGameCardSocketUpdatedRoomConfig = {
	updatedBy: string;
	roomDetails: TRoomInfo;
};

export type TGameCardSocketCloseRoom = {
	closedBy: string;
	roomDetails: TRoomInfo;
	listRooms: TRoomInfo[];
};
