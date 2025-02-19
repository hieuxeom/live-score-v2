export type TBadmintonMatch = {
	match_id: string | number;
	match_title: string;
	created_by: string;
	created_at: string;
	updated_at: string;
	is_closed: boolean;
	is_deleted: boolean;
};

export type TBadmintonScoreFormat = "15pts" | "21pts_bo1" | "21pts_bo3" | "31pts" | "timer";

export type TBadmintonMatchConfig = {
	match_id: string | number;
	score_format: TBadmintonScoreFormat;
	max_time: number;
	start_time: string | null;
	end_time: string | null;
	player1_name: string;
	player2_name: string;
	umpire_judge: string;
	service_judge: string;
};

export type TBadmintonMatchInfo = TBadmintonMatch &
	TBadmintonMatchConfig & {
		umpire_judge_name: string;
		service_judge_name: string;
		username: string;
	};

export type TBadmintonNewMatch = Pick<TBadmintonMatch, "match_title"> &
	Omit<TBadmintonMatchConfig, "match_id" | "start_time" | "end_time">;
