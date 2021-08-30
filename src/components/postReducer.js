import produce from "immer";

const initialState = {
  error = null,
  union_infos = null,
  post = null,
};

const postReducer = produce((state, action) => {
  console.log(action);
  switch(action.type){
    case "SET_ERROR" :
      state.error = action.payload;
      break;
    case "SET_UNION_INFOS":
      state.union_infos = action.payload;

    case "SET_POST":
      state.post = action.payload;
  }
}, initialState);

export default postReducer;