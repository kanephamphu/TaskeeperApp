import {GET_ALLSAVE} from '../constants';

export const getAllSave=(payload)=>{
    return {
        type:GET_ALLSAVE,
        payload
    }
}