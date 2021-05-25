import {GET_NEWFEED,ON_REFRESH,APPLY_TASK,SAVE_TASK} from '../constants';

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
export const onApplyTask=(payload)=>{
    return {
        type:APPLY_TASK,
        payload
    }
}
export const onSaveTask=(payload)=>{
    return {
        type:SAVE_TASK,
        payload
    }
}