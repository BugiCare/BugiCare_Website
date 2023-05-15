import React from "react";
import {Routes, Route, useLocation} from "react-router-dom"
import {useSelector} from "react-redux";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import AddUser from "./pages/AddUser";
import BoardList from "./pages/BoardList";
import LiveVideo from "./pages/LiveVideo";
import Chart from "./pages/Chart";

//import MyBoardList from "./pages/MyBoardList";
import Board from "./pages/Board";
import EditUser from "./pages/EditUser";
//import MyPage from "./pages/EditMyPage";
import MyPage from "./pages/EditMyPage1";

import MyList from "./pages/MyList";

const App = () => {
    const token = useSelector((state) => state.Auth.token);
    console.log(token);
    const location = useLocation();

    return (
        <React.Fragment>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                {/*<Route path="/board-list" element={<BoardList/>}/>*/}
                {/*노드JS<Route path="/board/:board_id" element={<Board/>}/>*/}
                <Route path="/user/:board_id" element={<Board/>}/>
                <Route path="/user/:board_id/cctv" element={<LiveVideo/>}/>
                <Route path="/user/:board_id/chart" element={<Chart/>}/>

                    {/*<Route path="/allUser" element={<BoardList/>}/>*/}
                <Route path="/pageUser" element={<BoardList/>}/>
                <Route path="/add-board" element={<AddUser/>}/>
                <Route path="/myboard-list" element={<MyList/>}/>

                <Route path="/edit-board/:board_id" element={<EditUser/>}/>
                <Route path="/mypage" element={<MyPage/>}/>

                {/* 인증이 필요한 컴포넌트는 아래처럼 PrivateRoute 컴포넌트 사용!*/}
                <Route
                    path="/add-board"
                    element={
                        <PrivateRoute path="/add-board" component={AddUser}/>
                    }
                />
                <Route
                    path="/myboard-list"
                    element={
                        // 쿼리 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
                        //<PrivateRoute path={`${location.pathname}`} component={MyBoardList}/>
                        <PrivateRoute path={`${location.pathname}`} component={MyList}/>
                    }
                />
                <Route
                    path="/edit-board/:board_id"
                    element={
                        // URI 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
                        <PrivateRoute path={`${location.pathname}`} component={EditUser}/>
                    }
                />
                <Route
                    path="/mypage"
                    element={
                        // URI 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
                        <PrivateRoute path={`${location.pathname}`} component={MyPage}/>
                    }
                />
            </Routes>
        </React.Fragment>
    )
}
export default App