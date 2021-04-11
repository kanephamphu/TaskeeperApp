import {GET_APPROVE} from '../constants';
let initialState={
    isLoading:true,
    data:[]
};
let myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case GET_APPROVE :
            return {
                ...state,
                data:action.payload,
                isLoading:false,
            };
        default: return state;
    }
}
export default myReducer;