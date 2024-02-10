import { CssBaseline } from "@mui/material";
import Box from "@mui/system/Box";
import PopularChannels from "../components/PrimaryDrawer/PopularCHannels";
import Main from "./templates/Main";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";

const Home = () => {
	return (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<PrimaryAppBar />
				<PrimaryDrawer>
					<PopularChannels />
				</PrimaryDrawer>
				<SecondaryDrawer />
				<Main />
			</Box>
		</>
	);
};

export default Home;
