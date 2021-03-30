import {GET_APPLY} from '../constants';
let initialState={
    isLoading:true,
    data:[]
};
let myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case GET_APPLY :
            return {
                ...state,
                data:action.payload,
                isLoading:false,
            };
        default: return state;
    }
}
export default myReducer;