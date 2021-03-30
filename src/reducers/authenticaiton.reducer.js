import {LOGIN} from '../constants';
let initialState={
    isLoading:true,
    useToken:null
}
let myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case LOGIN :
            return {
                ...state,
                userToken:action.token,
                isLoading:false,
            };
        default: return state;
    }
}
export default myReducer;