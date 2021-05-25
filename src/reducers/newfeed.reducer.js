import { GET_NEWFEED, ON_REFRESH, APPLY_TASK, SAVE_TASK } from "../constants";
import _ from "lodash";
let initialState = [];
let findIndex = (data, id) => {
  let result = -1;
  data.forEach((data, index) => {
    console.log(data._id);
    if (data._id === id) {
      result = index;
    }
  });
  return result;
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWFEED:
      state = state.concat(action.payload);
      state = _.unionBy(state, state, "_id");
      return [...state];
    case ON_REFRESH:
      state = [];
      return [...state];
    case APPLY_TASK:
      state = state.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return state;
    case SAVE_TASK: 
      state = state.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return state;
    default:
      return state;
  }
};
export default myReducer;
