import {BrowserRouter, Route, Routes} from "react-router";
import ClientLayout from "../../components/layout/client-layout";
import Homepage from "../../pages/homepage";
import CardGame from "../../pages/card-game";
import NewRoom from "../../pages/card-game/new-room";
import GameRoom from "../../pages/card-game/game-room";
import SignUp from "../../pages/sign-up";
import SignIn from "../../pages/sign-in";
import Badminton from "../../pages/badminton";
import Redirect from "../redirect";
import SignOut from "../../pages/sign-out";
import BadmintonNewTournament from "../../pages/badminton/badminton-new-tournament";
import BadmintonTourInfo from "../../pages/badminton/badminton-tour-info";
import BadmintonConfigTour from "../../pages/badminton/badminton-config-tour";
import BadmintonPlayerManagement from "../../pages/badminton/badminton-player-management";
import BadmintonPlayers from "../../pages/badminton/badminton-players";

interface IndexRouterProps {
}

const IndexRouter = ({}: IndexRouterProps) => (
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={<ClientLayout/>}
            >
                <Route
                    index
                    element={<Homepage/>}
                />
                <Route
                    path={"sign-up"}
                    element={<SignUp/>}
                />
                <Route
                    path={"sign-in"}
                    element={<SignIn/>}
                />
                <Route
                    path={"sign-out"}
                    element={<SignOut/>}
                />
                <Route path={"/card-game"}>
                    <Route
                        index
                        element={<CardGame/>}
                    />
                    <Route
                        path={"new"}
                        element={<NewRoom/>}
                    />
                    <Route
                        path={":roomId"}
                        element={<GameRoom/>}
                    />
                </Route>
                <Route path={"/badminton"}>
                    <Route
                        index
                        element={<Badminton/>}
                    />
                    <Route
                        path={"new"}
                        element={<BadmintonNewTournament/>}
                    />
                    <Route path={"players"}>
                        <Route
                            index
                            element={<BadmintonPlayers/>}
                        />
                        <Route
                            path={"new"}
                            element={<BadmintonPlayerManagement/>}
                        />
                    </Route>

                    <Route path={":tourId"}>
                        <Route
                            index
                            element={<BadmintonTourInfo/>}
                        />
                        <Route
                            path={"config"}
                            element={<BadmintonConfigTour/>}
                        />
                    </Route>

                </Route>
                {/*
				<Route path={"/football"}>
					<Route
						index
						element={<FootballIndex />}
					></Route>
				</Route>
				<Route path={"/badminton"}>
					<Route
						index
						element={<BadmintonIndex />}
					></Route>
				</Route> */}

                <Route
                    path={"*"}
                    element={<Redirect to={"/"}/>}
                />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default IndexRouter;
