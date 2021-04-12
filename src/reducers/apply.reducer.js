import {GET_APPLY,DELETE_APPLY} from '../constants';
let initialState={
    data:[],
    isLoading:true,
};
let myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case GET_APPLY :
            return {
                ...state,
                data:action.payload,
                isLoading:false,
            };
        case DELETE_APPLY :
            const filteredData = state.data.filter(data => data._id != action.id);
            return {
                ...state,
                data:filteredData
            }
        default: return state;
    }
}
export default myReducer;