import io from "socket.io-client";

//TODO: Change the IP address to the spark API url: https://api.spark4community.com:8000
const socket = io("http://192.232.212.61:8000");

export default socket;
