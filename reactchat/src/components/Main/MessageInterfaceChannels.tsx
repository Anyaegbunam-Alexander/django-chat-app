import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	AppBar,
	Avatar,
	Box,
	Drawer,
	IconButton,
	ListItemAvatar,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Server } from "../../@types/server";
import { MEDIA_URL } from "../../config";
import ServerChannels from "../SecondaryDraw/ServerChannels";

interface ServerChannelProps {
	data: Server[];
}

const MessageInterfaceChannels = (props: ServerChannelProps) => {
	const { data } = props;
	const theme = useTheme();
	const { serverId, channelId } = useParams();
	const [sideMenu, setSideMenu] = useState(false);
	const channelName =
		data
			?.find((server) => server.id == Number(serverId))
			?.channels?.find((channel) => channel.id == Number(channelId))?.name ||
		"home";
	const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

	useEffect(() => {
		if (isSmallScreen && sideMenu) {
			setSideMenu(false);
		}
	}, [isSmallScreen]);

	const toggleDrawer =
		() => (event: React.MouseEvent | React.KeyboardEvent) => {
			if (
				(event.type === "keydown" &&
					(event as React.KeyboardEvent).key === "Tab") ||
				(event as React.KeyboardEvent).key === "Shift"
			) {
				return;
			}
			let action: boolean;
			if (sideMenu) {
				action = false;
			} else {
				action = true;
			}
			setSideMenu(action);
		};

	const list = () => (
		<Box
			sx={{ paddingTo: `${theme.PrimaryAppBar.height}px`, minWidth: 200 }}
			onClick={toggleDrawer()}
			onKeyDown={toggleDrawer()}
		>
			<ServerChannels data={data} />
		</Box>
	);
	return (
		<>
			<AppBar
				sx={{
					backgroundColor: theme.palette.background.default,
					borderBottom: `1px solid ${theme.palette.divider} `,
				}}
				color="default"
				position="sticky"
				elevation={0}
			>
				<Toolbar
					variant="dense"
					sx={{
						minHeight: theme.PrimaryAppBar.height,
						height: theme.PrimaryAppBar.height,
						display: "flex",
						alignItems: "center",
					}}
				>
					<Box sx={{ display: { xs: "block", sm: "none" } }}>
						<ListItemAvatar sx={{ minWidth: "40px" }}>
							<Avatar
								alt="Server Icon"
								src={`${MEDIA_URL}${data?.[0]?.icon}`}
								sx={{ width: 30, height: 30 }}
							/>
						</ListItemAvatar>
					</Box>
					<Typography noWrap component="div">
						{channelName}
					</Typography>
					<Box sx={{ flexGrow: 1 }}></Box>
					<Box sx={{ display: { xs: "block", sm: "none" } }}>
						<IconButton color="inherit" edge="end" onClick={toggleDrawer()}>
							<MoreVertIcon />
						</IconButton>
					</Box>
					<Drawer anchor="left" open={sideMenu} onClose={toggleDrawer()}>
						{list()}
					</Drawer>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default MessageInterfaceChannels;
