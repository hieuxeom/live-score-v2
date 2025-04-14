import clsx from "clsx";
import {useContext, useEffect, useRef, useState} from "react";
import {useCookies} from "react-cookie";
import toast from "react-hot-toast";
import {useNavigate, useParams} from "react-router";
import Button from "../../../components/button";
import CustomHelmet from "../../../components/custom-helmet";
import Loading from "../../../components/loading";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import API_ROUTES from "../../../configs/api-routes.config";
import {BREAK_POINT} from "../../../configs/break-points.config";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";
import SOCKET_EVENT_NAMES from "../../../configs/socket-event-names.config";
import useAxios from "../../../hooks/useAxios";
import useScreenSize from "../../../hooks/useScreenSize";
import useSocket from "../../../hooks/useSocket";
import {
    TGameCardRoomResults,
    TGameCardSocketCloseRoom,
    TGameCardSocketDeleteResult,
    TGameCardSocketNewResult,
    TGameCardSocketPlayerChange,
    TGameCardSocketReOpenRoom,
    TGameCardSocketUpdatedRoomConfig,
    TRoomInfo,
} from "../../../types/game-card";
import {IAPIResponse} from "../../../types/general";
import MatchConfig from "../components/match-config";
import ModalAddResult from "../components/modal-add-result";
import PlayHistoryTable from "../components/play-history-table";
import PlayerInRoom from "../components/player-in-room";
import RoomScoreBoard from "../components/room-score-board";
import Chip from "../../../components/chip";
import MAP_RES_CODE from "../../../configs/response-code-map.config.ts";
import {LanguageContext} from "../../../components/provider/language-provider.tsx";

interface GameRoomProps {
}

const GameRoom = ({}: GameRoomProps) => {
    const socket = useSocket();

    const {width} = useScreenSize();
    const [cookies] = useCookies(["username", "user_id"]);

    const {currentLanguage} = useContext(LanguageContext)
    const currentLanguageRef = useRef(currentLanguage);

    useEffect(() => {
        currentLanguageRef.current = currentLanguage;
    }, [currentLanguage]);


    const {roomId} = useParams();

    const axios = useAxios();
    const navigate = useNavigate();

    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [currentInRoom, setCurrentInRoom] = useState<number>(0);

    const [roomInfo, setRoomInfo] = useState<TRoomInfo>();
    const [roomResults, setRoomResults] = useState<TGameCardRoomResults>();
    const [playersInRoom, setPlayersInRoom] = useState<string[]>([]);

    const getRoomInfo = () => {
        if (!roomId) return;

        return axios
            .get<IAPIResponse<TRoomInfo>>(API_ROUTES.GAME_CARD.GET_ROOM_DETAILS(roomId))
            .then((response) => response.data)
            .then((response) => {
                setRoomInfo(response.results);
            });
    };

    const getRoomResults = () => {
        if (!roomId) return;

        return axios
            .get<IAPIResponse<TGameCardRoomResults>>(API_ROUTES.GAME_CARD.GET_ROOM_RESULTS(roomId))
            .then((response) => response.data)
            .then((response) => {
                setRoomResults(response.results);
            });
    };

    const handleCloseRoom = () => {
        if (!roomId) return;

        socket.emit(SOCKET_EVENT_NAMES.CLOSE_ROOM.SEND, {roomId, closedBy: cookies.username});
    };

    const handleReOpenRoom = () => {
        if (!roomId) return;

        socket.emit(SOCKET_EVENT_NAMES.REOPEN_ROOM.SEND, {roomId, reOpenBy: cookies.username});
    };

    const handleLeaveRoom = () => {
        socket.emit(SOCKET_EVENT_NAMES.LEAVE_CARDGAME_ROOM, {roomId, username: cookies.username});
        navigate(ROUTE_PATH.HOME);
    };


    useEffect(() => {
        if (isNaN(Number(roomId))) {
            return navigate(ROUTE_PATH.HOME);
        }

        Promise.all([getRoomInfo(), getRoomResults()]);
        
        // if (cookies.username) {
        socket.emit(SOCKET_EVENT_NAMES.JOIN_CARDGAME_ROOM, {roomId, username: cookies.username});
        // }
        socket.on(SOCKET_EVENT_NAMES.PLAYER_CHANGE, (data: TGameCardSocketPlayerChange) => {
            setCurrentInRoom(data.currentInRoom);
            setPlayersInRoom(data.playersInRoom);
        });

        socket.on(SOCKET_EVENT_NAMES.CREATE_RESULT.RECEIVE, (response: TGameCardSocketNewResult) => {

            toast.success(MAP_RES_CODE[response.responseCode][currentLanguageRef.current]);
            setRoomResults(response.roomResults);
            setIsShowModal(false);
        });

        socket.on(SOCKET_EVENT_NAMES.UPDATE_ROOM_CONFIG.RECEIVE, (response: TGameCardSocketUpdatedRoomConfig) => {
            toast.success(MAP_RES_CODE[response.responseCode][currentLanguageRef.current]);
            setRoomInfo(response.roomDetails);
            getRoomResults();
        });

        socket.on(SOCKET_EVENT_NAMES.DELETE_MATCH_RESULTS.RECEIVE, (response: TGameCardSocketDeleteResult) => {
            toast.success(MAP_RES_CODE[response.responseCode][currentLanguageRef.current]);
            setRoomResults(response.roomResults);
        });

        socket.on(SOCKET_EVENT_NAMES.CLOSE_ROOM.RECEIVE, (response: TGameCardSocketCloseRoom) => {
            toast.success(MAP_RES_CODE[response.responseCode][currentLanguageRef.current]);
            setRoomInfo(response.roomDetails);
        });

        socket.on(SOCKET_EVENT_NAMES.REOPEN_ROOM.RECEIVE, (response: TGameCardSocketReOpenRoom) => {
            toast.success(MAP_RES_CODE[response.responseCode][currentLanguageRef.current]);
            setRoomInfo(response.roomDetails);
        });

        return () => {
            socket.emit(SOCKET_EVENT_NAMES.LEAVE_CARDGAME_ROOM, {roomId, username: cookies.username});
        };
    }, []);

    return (
        <>
            {!roomInfo ? (
                <Loading/>
            ) : (
                <>
                    {" "}
                    <CustomHelmet
                        title={"Phòng " + roomId}
                        description={"Phòng chơi"}
                        keywords={["game room", "room"]}
                    />
                    <Wrapper
                        size={"full"}
                        centerX={true}
                        orientation={"vertical"}
                        className={clsx("h-full my-16", "xl:px-8", "px-4", "2xl:h-[120vh]", "xl:h-[120vh]", "")}
                    >
                        <>
                            <div
                                className={clsx(
                                    "w-full bg-white p-4 shadow-primary-1 rounded-2xl flex flex-col gap-4",
                                    "2xl:w-3/4",
                                    "lg:p-8"
                                )}
                            >
                                <div
                                    className={clsx("flex justify-between items-start flex-col gap-4", "lg:flex-row")}>
                                    <div className={clsx("flex items-start justify-between w-full", "lg:w-max")}>

                                        <div className={clsx("flex flex-col gap-0.5", "lg:gap-2")}>
                                            <div className={"flex items-center gap-4"}>
                                                <div className={clsx("flex items-center gap-2", "lg:gap-2")}>
                                                    <Typography
                                                        type={"h1"}
                                                        className={"text-center text-secondary"}
                                                    >
                                                        Phòng
                                                    </Typography>
                                                    <Typography
                                                        type={"h1"}
                                                        className={"text-center text-primary"}
                                                    >
                                                        #{roomId}
                                                    </Typography>
                                                </div>
                                                {roomInfo.is_closed ? (
                                                    <div className={clsx("")}>
                                                        <Chip color={"danger"}>Đã đóng</Chip>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <Typography
                                                type={"muted"}
                                                className={"italic"}
                                            >
                                                Tạo bởi {roomInfo.username}
                                            </Typography>
                                        </div>

                                    </div>
                                    <div className={clsx("flex items-center gap-4")}>
                                        <Typography
                                            type={"large"}
                                            className={"xl:block hidden"}
                                        >
                                            <strong className={"text-primary"}>{currentInRoom}</strong> trong phòng
                                        </Typography>

                                        {
                                            cookies.user_id === roomInfo.created_by && (

                                                roomInfo.is_closed ? (
                                                    <Button
                                                        size={width > BREAK_POINT.LG ? "lg" : "md"}
                                                        color={"success"}
                                                        variant={"solid-3d"}
                                                        onClick={handleReOpenRoom}
                                                        endIcon={ICON_CONFIG.LEAVE_ROOM}
                                                    >
                                                        Mở phòng
                                                    </Button>
                                                ) : <Button
                                                    size={width > BREAK_POINT.LG ? "lg" : "md"}
                                                    color={"danger"}
                                                    variant={"solid-3d"}
                                                    onClick={() => handleCloseRoom()}
                                                    startIcon={ICON_CONFIG.CLOSE_ROOM}
                                                >
                                                    Đóng phòng
                                                </Button>

                                            )
                                        }

                                        <Button
                                            size={width > BREAK_POINT.LG ? "lg" : "md"}
                                            color={"secondary"}
                                            variant={"solid-3d"}
                                            onClick={handleLeaveRoom}
                                            endIcon={ICON_CONFIG.LEAVE_ROOM}
                                        >
                                            Thoát
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={clsx("w-full flex flex-col gap-4", "2xl:w-3/4", "lg:grid grid-cols-3 ")}>
                                {!roomResults ? (
                                    <div>Loading...</div>
                                ) : (
                                    <>
                                        <PlayHistoryTable
                                            roomInfo={roomInfo}
                                            playHistory={roomResults.playHistory}
                                            historyScoreBoard={roomResults.historyScoreBoard}
                                        />

                                        <div className={"flex flex-col gap-4"}>
                                            {(!roomInfo.is_closed && cookies.username) && (cookies.user_id === roomInfo.created_by) && (
                                                <div
                                                    className={clsx(
                                                        "w-full bg-light p-4 rounded-2xl shadow-primary-1",
                                                        "xl:h-[10vh]",
                                                        "lg:h-[6.5vh]"
                                                    )}
                                                >
                                                    <Button
                                                        fullWidth
                                                        variant={"solid-3d"}
                                                        color={"primary"}
                                                        startIcon={ICON_CONFIG.NEW}
                                                        size={"lg"}
                                                        onClick={() => setIsShowModal(true)}
                                                        className={"min-w-max"}
                                                    >
                                                        Thêm kết quả mới
                                                    </Button>
                                                </div>
                                            )}
                                            <div
                                                className={clsx(
                                                    "bg-white shadow-primary-1 rounded-2xl col-span-1 w-full flex flex-col gap-2",
                                                    "2xl:h-[35vh] 2xl:p-8",
                                                    "xl:h-[38vh]",
                                                    "lg:h-[24vh] lg:p-4",
                                                    "h-[40vh] p-4"
                                                )}
                                            >
                                                <RoomScoreBoard
                                                    scoreBoard={roomResults.scoreBoard}
                                                    roomInfo={roomInfo}
                                                />
                                            </div>
                                            <div
                                                className={clsx(
                                                    "bg-white shadow-primary-1 rounded-2xl col-span-1 w-full overflow-hidden flex flex-col gap-2",
                                                    "2xl:h-[calc(70vh-35vh-10vh-2rem)] 2xl:p-8",
                                                    "xl:h-[calc(70vh-38vh-10vh-2rem)]",
                                                    "lg:h-[calc(50vh-24vh-8vh-2rem)]",
                                                    "p-4 h-[25vh]"
                                                )}
                                            >
                                                <PlayerInRoom playersInRoom={playersInRoom}/>
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                            <div className={clsx("w-full gap-4", "2xl:w-3/4")}>
                                <MatchConfig
                                    roomDetails={roomInfo}
                                    onChangeConfig={setRoomInfo}
                                />
                            </div>
                        </>
                        <ModalAddResult
                            isShowModal={isShowModal}
                            setIsShowModal={setIsShowModal}
                            matchHistory={roomResults?.playHistory.matchResults || []}
                            roomInfo={roomInfo}
                        />
                    </Wrapper>
                </>
            )}
        </>
    );
};

export default GameRoom;
