import { CssBaseline } from "@mui/material";
import Box from "@mui/system/Box";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Server } from "../@types/server";
import MessageInterface from "../components/Main/MessageInterface";
import UserServers from "../components/PrimaryDrawer/UserServers";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import useCrud from "../hooks/useCrud";
import Main from "./templates/Main";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";

const Server = () => {
	const navigate = useNavigate();
	const { serverId, channelId } = useParams();

	const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
		[],
		`/servers/?server_id=${serverId}`
	);

	useEffect(() => {
		fetchData();
	}, []);

	// check if the channelId is valid by searching for it in the data fetched from the API
	const isChannel = (): boolean => {
		console.log(channelId);
		if (!channelId) {
			return true;
		}

		return dataCRUD.some((server) =>
			server.channels.some((channel) => channel.id === parseInt(channelId))
		);
	};

	useEffect(() => {
		if (!isChannel()) {
			navigate(`/servers/${serverId}`);
		}
	}, [isChannel, channelId]);

	if (error !== null && error.message === "400") {
		navigate("/");
		return null;
	}

	return (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<PrimaryAppBar />
				<PrimaryDrawer>
					<UserServers open={false} data={dataCRUD} />
				</PrimaryDrawer>
				<SecondaryDrawer>
					<ServerChannels data={dataCRUD} />
				</SecondaryDrawer>
				<Main>
					<MessageInterface />
				</Main>
			</Box>
		</>
	);
};

export default Server;
