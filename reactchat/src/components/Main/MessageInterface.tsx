import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Server } from "../../@types/server";
import { SOCKET_URL } from "../../config";
import useCrud from "../../hooks/useCrud";
import MessageInterfaceChannels from "./MessageInterfaceChannels";

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

const MessageInterface: React.FC<ServerChannelsProps> = ({ data }) => {
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
				console.log(data);
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
					<div>
						{newMessage.map((msg: OldMessage | NewMessage, index: number) => {
							return (
								<div key={index}>
									<p>{msg.content}</p>
									<p>{msg.sender}</p>
								</div>
							);
						})}
						<form>
							<label>Enter Message:</label>
							<br />
							<input
								type="text"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</form>
						<br />
						<button
							onClick={() => {
								sendJsonMessage({ type: "chat.message", message });
								setMessage("");
							}}
						>
							Send Message
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default MessageInterface;
