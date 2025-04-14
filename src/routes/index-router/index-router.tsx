import {BrowserRouter, Route, Routes} from "react-router";
import ClientLayout from "../../components/layout/client-layout";
import CardGame from "../../pages/card-game";
import NewRoom from "../../pages/card-game/new-room";
import GameRoom from "../../pages/card-game/game-room";
import SignUp from "../../pages/sign-up";
import SignIn from "../../pages/sign-in";
import Redirect from "../redirect";
import SignOut from "../../pages/sign-out";

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
                <Route
                    path={"*"}
                    element={<Redirect to={"/"}/>}
                />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default IndexRouter;
