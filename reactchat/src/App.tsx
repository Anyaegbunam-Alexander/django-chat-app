import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import ToggleColorMode from "./components/ToggleColorMode";
import { AuthServiceProvider } from "./contexts/AuthContext";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Server from "./pages/Server";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/servers/:serverId/:channelId?" element={<Server />} />
			<Route path="/explore/:categoryName" element={<Explore />} />
		</Route>
	)
);

const App = () => {
	return (
		<AuthServiceProvider>
			<ToggleColorMode>
				<RouterProvider router={router} />
			</ToggleColorMode>
		</AuthServiceProvider>
	);
};

export default App;
