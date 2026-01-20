import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createScoketConnection = () => {
  if (location.hostname === "localhost") {
    // Local development
    return io(BASE_URL, {
      withCredentials: true,
    });
  } else {
    // Production
    return io("https://devtinder-1-xdb9.onrender.com", {
      withCredentials: true,
    });
  }
};
