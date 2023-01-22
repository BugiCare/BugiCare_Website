import React from "react";
import {Routes, Route} from "react-router-dom"
import {useSelector} from "react-redux";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const App = () => {
    const token = useSelector((state) => state.Auth.token);
    console.log(token);

    return (
        <React.Fragment>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </React.Fragment>
    )
}
export default App