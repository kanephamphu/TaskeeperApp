import {GET_ALLNOTICE} from '../constants';

export const getAllNotice=(payload)=>{
    return {
        type:GET_ALLNOTICE,
        payload
    }
}