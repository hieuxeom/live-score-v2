import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = () => {
	if (!socket) {
		socket = io(import.meta.env.VITE_BASE_SERVER_URL, {
			autoConnect: false, // Tắt tự động kết nối nếu cần
		});
	}
	return socket;
};
