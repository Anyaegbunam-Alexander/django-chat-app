import { CssBaseline } from "@mui/material";
import Box from "@mui/system/Box";
import PopularChannels from "../components/PrimaryDrawer/PopularChannels";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";
import Main from "./templates/Main";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import ExploreServers from "../components/Main/ExploreServers";

const Explore = () => {
	return (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<PrimaryAppBar />
				<PrimaryDrawer>
					<PopularChannels open={false} />
				</PrimaryDrawer>
				<SecondaryDrawer>
					<ExploreCategories />
				</SecondaryDrawer>
                <Main>
                    <ExploreServers />
                </Main>
			</Box>
		</>
	);
};

export default Explore;
