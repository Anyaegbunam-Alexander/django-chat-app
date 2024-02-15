import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { SOCKET_URL } from "../../config";

const MessageInterface = () => {
	const [newMessage, setNewMessage] = useState<string[]>([]);
	const [message, setMessage] = useState("");
	const [inputValue, setInputValue] = useState("");
	const { sendJsonMessage } = useWebSocket(`${SOCKET_URL}/test`, {
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
