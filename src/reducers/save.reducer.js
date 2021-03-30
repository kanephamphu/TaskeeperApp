import {GET_ALLSAVE} from '../constants';
let initialState={
    isLoading:true,
    data:[]
};
let myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case GET_ALLSAVE :
            return {
                ...state,
                data:action.payload,
                isLoading:false,
            };
        default: return state;
    }
}
export default myReducer;