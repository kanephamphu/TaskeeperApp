import {GET_ALLSAVE,DELETE_SAVETASK} from '../constants';
let initialState={
    data:[],
    isLoading:true,
};
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
        case GET_ALLSAVE :
            return {
                ...state,
                data:action.payload,
                isLoading:false,
            };
        case DELETE_SAVETASK :
           /* index= findIndex(state.data,action.id)
            console.log(state.data)
            state.data.splice(index,1)
            console.log(state.data)
            return {
               
               data:state.data,
            }8*/
            const filteredData = state.data.filter(data => data._id != action.id);
            return {
                ...state,
                data:filteredData
            }
        default: return state;
    }
}
export default myReducer;