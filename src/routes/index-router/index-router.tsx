import { BrowserRouter, Route, Routes } from "react-router";
import ClientLayout from "../../components/layout/client-layout";
import Homepage from "../../pages/homepage";
import CardGame from "../../pages/card-game";
import NewRoom from "../../pages/card-game/new-room";
import GameRoom from "../../pages/card-game/game-room";
import SignUp from "../../pages/sign-up";
import SignIn from "../../pages/sign-in";

interface IndexRouterProps {}

const IndexRouter = ({}: IndexRouterProps) => (
	<BrowserRouter>
		<Routes>
			<Route
				path="/"
				element={<ClientLayout />}
			>
				<Route
					index
					element={<Homepage />}
				/>
				<Route
					path={"sign-up"}
					element={<SignUp />}
				/>
				<Route
					path={"sign-in"}
					element={<SignIn />}
				/>
				<Route path={"/card-game"}>
					<Route
						index
						element={<CardGame />}
					/>
					<Route
						path={"new"}
						element={<NewRoom />}
					/>
					<Route
						path={":roomId"}
						element={<GameRoom />}
					/>
				</Route>
				{/* <Route path={"/card-game"}>
					<Route
						index
						element={<CardGameIndex />}
					/>
					<Route
						path={"new"}
						element={<NewGame />}
					/>
					<Route
						path={":roomId"}
						element={<GameRoom />}
					/>
				</Route>
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
			</Route>
		</Routes>
	</BrowserRouter>
);

export default IndexRouter;
