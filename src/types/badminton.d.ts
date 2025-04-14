export type TEventName = "ms" | "ws" | "md" | "wd" | "xd";

export type TBadmintonTournament = {
    tour_id: string | number;
    tour_title: string;
    tour_description: string;
    venue: string;
    total_prize: number;
    tour_logo: string;
    tour_logo_name: string;
    created_by: number;
    start_date: string;
    end_date: string;
};

export type TNewBadmintonTour = Omit<
    TBadmintonTournament,
    "tour_id" | "tour_logo_name" | "created_by" | "tour_logo"
> & {
    tour_logo: FileList | null;
};

export type TUpdateBadmintonTour = TNewBadmintonTour;

export type TBadmintonPlayer = {
    player_id: string | number;
    player_display_name: string;
    player_first_name: string;
    player_last_name: string;
    player_image: string | null;
    player_image_name: string | null;
    player_birthdate: string;
    is_active: number;
    created_at: string;
    updated_at: string;
    ref_account: number | null;
    created_by: number;
};

export type TBadmintonTournamentPlayer = {
    tour_id: string | number;
    player_id: string | number;
    ranked: null | number;
} & Pick<TBadmintonPlayer, "player_display_name" | "player_first_name">;

export type TNewBadmintonPlayer = Pick<TBadmintonPlayer, "player_first_name" | "player_birthdate"> & {
    player_last_name: string;
    player_image: FileList | null;
};

export type TBadmintonTeam = {
    team_id: string | number;
    player1: string | number;
    player1_display_name: string;
    player1_image: string | null;
    player1_birthdate: string;
    player2: string | number | null;
    player2_display_name: string | null;
    player2_image: string | null;
    player2_birthdate: string | null;
    event_name: TEventName
}

export type TTourDraw = {
    tour_id: string | number;
    draw_id: string | number;
    draw_name: string;
    event_name: TEventName;
    teams: TBadmintonTeam[];
}

export type TNewDraw = Pick<TTourDraw, "draw_name" | "event_name">;

export type TDrawInfo = {
    tour_id: string | number;
    draw_id: string | number;
    draw_name: string;
    event_name: TEventName;
    teams: TBadmintonTeam[];
}