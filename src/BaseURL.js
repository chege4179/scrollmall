import {io} from "socket.io-client";


const BaseURL = 'https://scrollmall.herokuapp.com';
const WebSocketURL = 'ws://192.168.1.13:8000';

export const socket = io(BaseURL)


export default BaseURL
