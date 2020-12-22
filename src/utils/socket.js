import io from "socket.io-client";

//TODO change ip to domain address

const socket = io("http://localhost:8080");

export default socket;
