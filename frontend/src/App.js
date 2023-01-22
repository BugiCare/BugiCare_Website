import React from "react";
import {Routes, Route} from "react-router-dom"
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
      <React.Fragment>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </React.Fragment>
  )
}
export default App