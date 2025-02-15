// src/hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { initializeSocket } from "../utils/socket";

const useSocket = () => {
	const socketRef = useRef<Socket | null>(null);

	if (!socketRef.current) {
		socketRef.current = initializeSocket();
	}

	useEffect(() => {
		const socket = socketRef.current;

		if (socket && !socket.connected) {
			socket.connect();
		}

		// return () => {
		// 	if (socket && socket.connected) {
		// 		socket.disconnect();
		// 	}
		// };
	}, []);

	return socketRef.current;
};

export default useSocket;
