import { CssBaseline } from "@mui/material";
import Box from "@mui/system/Box";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import Main from "./templates/Main";

const Home = () => {
	return (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<PrimaryAppBar />
				<PrimaryDrawer></PrimaryDrawer>
				<SecondaryDrawer />
				<Main />
			</Box>
		</>
	);
};

export default Home;
