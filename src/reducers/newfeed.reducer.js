import {GET_NEWFEED,ON_REFRESH,APPLY_TASK} from '../constants';
let initialState=[];
let findIndex=(data,id)=>{
    let result=-1;
    data.forEach((data,index)=> {
        console.log(data._id);
        if(data._id===id){
            result = index;
          
        }
    });
    return result;

}
let myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case GET_NEWFEED :
            state=state.concat(action.payload)
            return [...state];
        case ON_REFRESH:   
            state=[]
            return [...state];
        case APPLY_TASK:
            let id= action.id;
            let index= findIndex(state,id);
            console.log(state[index].isApplied);
            state[index].isApplied=!state[index].isApplied;
            console.log(state[index].isApplied);
            return [...state];
        default: return state;
    }
}
export default myReducer;