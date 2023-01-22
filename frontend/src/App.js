import React from "react";
import {Routes, Route} from "react-router-dom"
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

const App = () => {
    return (
        <React.Fragment>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
            </Routes>
        </React.Fragment>
    )
}
export default App