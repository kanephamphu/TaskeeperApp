import {GET_NEWFEED,ON_REFRESH,APPLY_TASK} from '../constants';

export const getNewfeed=(payload)=>{
    return {
        type:GET_NEWFEED,
        payload
    }
}
export const onRefresh=()=>{
    return {
        type:ON_REFRESH,
        
    }
}
export const onApplyTask=()=>{
    return {
        type:APPLY_TASK,
    }
}