import {GET_EDUCATION} from '../constants';

export const getAllEducation=(payload)=>{
    return {
        type:GET_EDUCATION,
        payload
    }
}