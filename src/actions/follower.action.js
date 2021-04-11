import {GET_ALLFOLLOWER} from '../constants';

export const getAllFollower=(payload)=>{
    return {
        type:GET_ALLFOLLOWER,
        payload
    }
}