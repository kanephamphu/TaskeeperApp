import {GET_HRM} from '../constants';

export const getAllHrm=(payload)=>{
    return {
        type:GET_HRM,
        payload
    }
}