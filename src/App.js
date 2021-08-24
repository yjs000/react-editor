import React from "react"
import {Route, BrowserRouter} from "react-router-dom";
import PostForm from "./components/PostForm";


function App() {
  return (
  <BrowserRouter>
    <Route exact path="/" component={PostForm} />
  </BrowserRouter>
  );
}

export default App;
