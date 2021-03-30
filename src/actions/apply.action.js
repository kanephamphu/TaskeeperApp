import {GET_APPLY} from '../constants';

export const getAllApply=(payload)=>{
    return {
        type:GET_APPLY,
        payload
    }
}