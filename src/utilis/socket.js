import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createScoketConnection = () => {
  return io(BASE_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
};
