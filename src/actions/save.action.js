import {GET_ALLSAVE,DELETE_SAVETASK} from '../constants';

export const getAllSave=(payload)=>{
    return {
        type:GET_ALLSAVE,
        payload
    }
}
export const deleteSave=(id)=>{
    return {
        type:DELETE_SAVETASK,
        id
    }
}