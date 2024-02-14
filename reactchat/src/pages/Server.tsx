import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { SOCKET_URL } from "../config";

const Server = () => {
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
			setMessage(msg.data);
		},
	});

	const sendInputValue = () => {
		const message = { text: inputValue };
        sendJsonMessage(message);
        setInputValue("")
	};

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button onClick={sendInputValue}>Say Hello</button>
			<div>Received Data: {message}</div>
		</div>
	);
};

export default Server;
