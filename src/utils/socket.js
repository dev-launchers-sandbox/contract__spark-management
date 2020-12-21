import io from "socket.io-client";

const socket = io("https://api.spark4community.com:8000");

export default socket;
