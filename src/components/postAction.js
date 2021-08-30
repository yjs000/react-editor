import axios from "axios";

const URL =
  process.env.NODE_ENV !== "production"
    ? "http://13.209.214.244:8080/union"
    : "/union";


export function createPost(){
  return (dispatch) => {
    axios.post(URL + '/create/union/announcement')
    .then((data) => {
      dispatch({
        type: "SET_POST",
        palyload: data
      })
    })
    .catch(error => {
      dispatch({
        type: "SET_ERROR",
        palyload: error,
      })
    });
  };
}