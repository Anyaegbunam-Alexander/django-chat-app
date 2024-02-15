import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { SOCKET_URL } from "../../config";

const MessageInterface = () => {
	const [newMessage, setNewMessage] = useState<string[]>([]);
	const [message, setMessage] = useState("");
	const { serverId, channelId } = useParams();

	const URL = channelId ? `${SOCKET_URL}/${serverId}/${channelId}/` : null;
	const { sendJsonMessage } = useWebSocket(URL, {
		onOpen: () => {
			console.log("Connected!");
		},
		onClose: () => {
			console.log("Disconnected!");
		},
		onError: () => {
			console.log("Error!");
		},
		onMessage: (msg) => {
			const data = JSON.parse(msg.data);
			setNewMessage((prev_message) => [...prev_message, data.new_message]);
		},
	});

	return (
		<div>
			{newMessage.map((msg, index) => {
				return (
					<div key={index}>
						<p>{msg}</p>
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
