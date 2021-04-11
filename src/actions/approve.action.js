import {GET_APPROVE} from '../constants';

export const getAllApprove=(payload)=>{
    return {
        type:GET_APPROVE,
        payload
    }
}