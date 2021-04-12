import {GET_APPLY,DELETE_APPLY,APPLY_TASK} from '../constants';
import {socket} from '../Socket.io/socket.io'
export const getAllApply=(payload)=>{
    return {
        type:GET_APPLY,
        payload
    }
}
export const deleteApply=(id)=>{
    return {
        type:DELETE_APPLY,
        id
    }
}
export const applyTask=(id)=>{
    return {
        type:APPLY_TASK,
        id
    }
}


