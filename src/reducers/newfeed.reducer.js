import {GET_NEWFEED,ON_REFRESH} from '../constants';
let initialState=[];
let myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case GET_NEWFEED :
            state=state.concat(action.payload)
           
            return [...state];
        case ON_REFRESH:   
            state=[]
            return [...state];
        default: return state;
    }
}
export default myReducer;