import {AP_ADRESS} from "./src/apAdress"
import io from 'socket.io-client';
export default socket = io(`http://${AP_ADRESS}:4000`); 