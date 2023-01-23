import React from "react";
import {Routes, Route} from "react-router-dom"
import {useSelector} from "react-redux";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import AddBoard from "./pages/AddBoard";

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
                {/* 인증이 필요한 컴포넌트는 아래처럼 PrivateRoute 컴포넌트 사용!*/}
                <Route
                    path="/add-board"
                    element={
                        <PrivateRoute path="/add-board" component={AddBoard}/>
                    }
                />
            </Routes>
        </React.Fragment>
    )
}
export default App