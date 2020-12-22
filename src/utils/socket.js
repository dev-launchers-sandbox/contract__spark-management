import io from "socket.io-client";

//TODO: Change the IP address to the spark API url: https://api.spark4community.com:8000
const socket = io("https://socket.spark4community.com");

export default socket;
