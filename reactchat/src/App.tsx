import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import ToggleColorMode from "./components/ToggleColorMode";
import Explore from "./pages/Explore";
import Home from "./pages/Home";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Home />} />
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
