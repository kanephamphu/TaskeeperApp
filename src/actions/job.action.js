import {GET_JOBS} from '../constants';

export const getAllJob=(payload)=>{
    return {
        type:GET_JOBS,
        payload
    }
}