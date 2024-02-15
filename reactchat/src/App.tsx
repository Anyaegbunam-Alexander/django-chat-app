import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import ToggleColorMode from "./components/ToggleColorMode";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Server from "./pages/Server";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Home />} />
			<Route path="/servers/:serverId/:channelId?" element={<Server />} />
			<Route path="/explore/:categoryName" element={<Explore />} />
		</Route>
	)
);

const App = () => {
	return (
		<ToggleColorMode>
			<RouterProvider router={router} />
		</ToggleColorMode>
	);
};

export default App;
