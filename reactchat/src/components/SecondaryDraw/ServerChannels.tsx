import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Server } from "../../@types/server";

interface ServerChannelsProps {
	data: Server[];
}

const ServerChannels: React.FC<ServerChannelsProps> = ({ data }) => {
	const theme = useTheme();
	const server = data[0];
	const channels = server?.channels;
	const { serverId } = useParams();

	return (
		<>
			<Box
				sx={{
					height: "50px",
					display: "flex",
					alignItems: "center",
					px: 2,
					borderBottom: `1px solid ${theme.palette.divider}`,
					position: "sticky",
					top: 0,
					backgroundColor: theme.palette.background.default,
				}}
			>
				<Typography
					variant="body1"
					style={{
						textOverflow: "ellipsis",
						overflow: "hidden",
						whiteSpace: "nowrap",
					}}
				>
					{server ? server.name : "Server Name"}
				</Typography>
			</Box>
			<List sx={{ py: 0 }}>
				{channels
					? channels.map((item) => (
							<ListItem
								key={item.id}
								disablePadding
								sx={{ display: "block" }}
								dense={true}
							>
								<Link
									to={`/servers/${serverId}/${item.id}`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<ListItemButton sx={{ minHeight: 48 }}>
										<ListItemText
											primary={
												<Typography
													variant="body1"
													textAlign="start"
													paddingLeft={1}
												>
													{item.name}
												</Typography>
											}
										/>
									</ListItemButton>
								</Link>
							</ListItem>
					  ))
					: null}
			</List>
		</>
	);
};

export default ServerChannels;
