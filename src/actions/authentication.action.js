import {LOGIN} from '../constants';

export const onLogin=(token)=>{
    return {
        type:LOGIN,
        token
    }
}