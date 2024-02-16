import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { SOCKET_URL } from "../../config";
import useCrud from "../../hooks/useCrud";
import { Server } from "../../@types/server";

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

const MessageInterface = () => {
	const [newMessage, setNewMessage] = useState<NewMessage[] | OldMessage[]>([]);
	const [message, setMessage] = useState("");
	const { serverId, channelId } = useParams();
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
				console.log(data)
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
		<div>
			{newMessage.map((msg: OldMessage| NewMessage, index: number) => {
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
	);
};

export default MessageInterface;
