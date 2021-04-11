import {GET_HRM} from '../constants';
let initialState={
    isLoading:true,
    test:true,
    task_id:'',
    data:[]
};
let myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case GET_HRM :
            return {
                ...state,
                data:action.payload,
                task_id:action.payload._id,
                isLoading:false,
                test:false
            };
        default: return state;
    }
}
export default myReducer;