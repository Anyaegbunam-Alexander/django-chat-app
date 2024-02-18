import {
	Avatar,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Server } from "../../@types/server";
import { SOCKET_URL } from "../../config";
import useCrud from "../../hooks/useCrud";
import MessageInterfaceChannels from "./MessageInterfaceChannels";
import Scroll from "./Scroll";

interface ServerChannelsProps {
	data: Server[];
}
interface OldMessage {
	id: number;
	sender: string;
	content: string;
	timestamp: string;
	conversation: number;
}

interface NewMessage {
	type: string;
	id: number;
	content: string;
	sender: string;
	timestamp: string;
	conversation: number;
}

interface SendMessageData {
	type: string;
	message: string;
	[key: string]: unknown;
}

const MessageInterface: React.FC<ServerChannelsProps> = ({ data }) => {
	const theme = useTheme();
	const [newMessage, setNewMessage] = useState<NewMessage[] | OldMessage[]>([]);
	const [message, setMessage] = useState("");
	const { serverId, channelId } = useParams();
	const serverName = data[0]?.name;
	const serverDescription = data[0]?.description ?? "This is our home";
	const { fetchData } = useCrud<Server>(
		[],
		`/messages/?channel_id=${channelId}`
	);

	const URL = channelId ? `${SOCKET_URL}/${serverId}/${channelId}/` : null;
	const { sendJsonMessage } = useWebSocket(URL, {
		onOpen: async () => {
			try {
				const data = await fetchData();
				setNewMessage([]);
				setNewMessage(Array.isArray(data) ? data : []);
				console.log("Connected!");
			} catch (error) {
				console.log(error);
			}
		},
		onClose: () => {
			console.log("Disconnected!");
		},
		onError: () => {
			console.log("Error!");
		},
		onMessage: (msg) => {
			const data = JSON.parse(msg.data);
			setNewMessage((prev_message) => [...prev_message, data]);
		},
	});

	const sendMessage = () => {
		sendJsonMessage({
			type: "message",
			message,
		} as SendMessageData);
		setMessage("");
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendMessage();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			sendMessage();
		}
	};

	const formatTimestamp = (timestamp: string): string => {
		const date = new Date(Date.parse(timestamp));
		const formattedDate = `${
			date.getMonth() + 1
		}/${date.getDate()}/${date.getFullYear()}`;
		const formattedTime = date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
		return `${formattedDate} - ${formattedTime}`;
	};

	return (
		<>
			<MessageInterfaceChannels data={data} />
			{channelId === undefined ? (
				<Box
					sx={{
						overflow: "hidden",
						p: { xs: 0 },
						height: "calc(80vh)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box sx={{ textAlign: "center" }}>
						<Typography
							variant="h4"
							fontWeight={700}
							letterSpacing="-0.5"
							sx={{ px: 5, maxWidth: "600px" }}
						>
							Welcome to {serverName}
						</Typography>
						<Typography>{serverDescription}</Typography>
					</Box>
				</Box>
			) : (
				<>
					<Box sx={{ overflow: "hidden", p: 0, height: `calc(100vh - 100px)` }}>
						<Scroll>
							<List sx={{ width: "100%", bgcolor: "background.paper" }}>
								{newMessage.map(
									(msg: OldMessage | NewMessage, index: number) => {
										return (
											<ListItem key={index} alignItems="flex-start">
												<ListItemAvatar>
													<Avatar alt="user image" />
												</ListItemAvatar>
												<ListItemText
													primaryTypographyProps={{
														fontSize: 12,
														variant: "body2",
													}}
													primary={
														<>
															<Typography
																component="span"
																variant="body1"
																color="text.primary"
																sx={{ display: "inline", fontWeight: 600 }}
															>
																{msg.sender}
															</Typography>
															<Typography
																component="span"
																variant="caption"
																color="textSecondary"
															>
																{` ( ${formatTimestamp(msg.timestamp)} )`}
															</Typography>
														</>
													}
													secondary={
														<React.Fragment>
															<Typography
																variant="body1"
																style={{
																	overflow: "visible",
																	whiteSpace: "normal",
																	textOverflow: "clip",
																}}
																sx={{
																	display: "inline",
																	lineHeight: 1.2,
																	fontWeight: 400,
																	letterSpacing: "-0.2px",
																}}
																component="span"
																color="text.primary"
															>
																{msg.content}
															</Typography>
														</React.Fragment>
													}
												/>
											</ListItem>
										);
									}
								)}
							</List>
						</Scroll>
					</Box>
					<Box sx={{ position: "sticky", bottom: 0, width: "100%" }}>
						<form
							onSubmit={handleSubmit}
							style={{
								bottom: 0,
								right: 0,
								padding: "1rem",
								backgroundColor: theme.palette.background.default,
								zIndex: 1,
							}}
						>
							<Box sx={{ display: "flex" }}>
								<TextField
									fullWidth
									multiline
									minRows={1}
									maxRows={4}
									sx={{ flexGrow: 1 }}
									onChange={(e) => setMessage(e.target.value)}
									value={message}
									onKeyDown={handleKeyDown}
								/>
							</Box>
						</form>
					</Box>
				</>
			)}
		</>
	);
};

export default MessageInterface;
