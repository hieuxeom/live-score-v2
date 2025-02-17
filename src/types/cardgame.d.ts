export type TRoom = {
	room_id: number;
	created_by: number;
	email: string;
	created_at: string;
	updated_at: string;
	is_closed: number;
	is_deleted: number;
};

export type TRoomConfig = {
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

export type TRoomInfo = TRoom & TRoomConfig & { username: string };

export type TRoomConfig = Omit<TRoomInfo, "room_id" | "created_at" | "updated_at" | "is_closed" | "is_deleted">;

export type NewRoomDetails = {};

export type TMatchHistory = {
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

export type TPlayerResult = {
	player_index: number;
	rank: number;
	win_all: number;
	burnt_out: number;
	swept_out: number;
};

export type TPostPlayerResult = Omit<TPlayerResult, "player_index">;

export type TNewMatchPostBody = {
	matchId: number;
	player1Result: TPostPlayerResult | null;
	player2Result: TPostPlayerResult | null;
	player3Result: TPostPlayerResult | null;
	player4Result: TPostPlayerResult | null;
	twoPlayResults: Omit<TTwoPlayResult, "result_id" | "match_id">[];
};

export type TScoreBoard = {
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

export type THistoryScoreBoard = number[][];

export type TRoomResults = {
	scoreBoard: TScoreBoard;
	historyScoreBoard: THistoryScoreBoard;
	playHistory: TPlayHistory;
};

export type TTwoPlayResult = {
	result_id: number;
	match_id: number;
	two_color: "red" | "black";
	taker: number;
	burner: number;
	quantity: number;
};

export type TPlayHistory = {
	matchResults: IMatchHistory[];
	twoPlayResults: TTwoPlayResult[];
};

export type TSocketPlayerChange = {
	newJoin: string;
	newLeave: string;
	currentInRoom: number;
	playersInRoom: string[];
};

export type TSocketRoomCreated = {
	listRooms: TRoomInfo[];
	newRoomId: string;
};

export type TSocketNewResult = {
	createdBy: string;
	roomResults: TRoomResults;
};

export type TSocketDeleteResult = {
	deleteBy: string;
	roomResults: TRoomResults;
};

export type TSocketUpdatedRoomConfig = {
	updatedBy: string;
	roomDetails: TRoomInfo;
};

export type TSocketCloseRoom = {
	closedBy: string;
	roomDetails: TRoomInfo;
	listRooms: TRoomInfo[];
};
