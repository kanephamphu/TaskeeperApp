import io from 'socket.io-client/dist/socket.io';
import {GET_ALLFOLLOWER,IS_STATUS} from '../constants';
let initialState=false;
let myReducer =(state=initialState,action)=>{
    switch(action.type) {
        case IS_STATUS :
            return true ;       
        default: return state;
    }
}

export default myReducer;