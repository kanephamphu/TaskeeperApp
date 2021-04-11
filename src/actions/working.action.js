import {GET_WORKING} from '../constants';

export const getAllWorking=(payload)=>{
    return {
        type:GET_WORKING,
        payload
    }
}