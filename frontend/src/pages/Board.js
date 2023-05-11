import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import "../css/board.scss";
import {jwtUtils} from "../utils/jwtUtils";
import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import {useSelector} from "react-redux";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import api from "../utils/api";
import moment from "moment";
import Comments from "../components/Comments";
import EditDeleteBtn from "../components/EditDeleteBtn";
import Information from "./Information";
import Chart from "./Chart";

import Sidebar from "../components/Sidebar";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

const Board = () => {
    // URL 파라미터 받기 - board의 id
    const {board_id} = useParams();
    const [board, setBoard] = useState({});
    const [managerData,setManagerData]=useState()

    const [isLoaded, setIsLoaded] = useState(false);
    const token = useSelector(state => state.Auth.token);
    const navigate = useNavigate();
    // modal이 보이는 여부 상태
    // board 가져오기



console.log(board_id,board)
    useEffect(() => {
        const getUser = async () => {
            const {data} = await axios.get(`${url}/user/${board_id}`);
            return data;
        }
        getUser().then(result => setBoard(result)).then(() => setIsLoaded(true));
    }, [])



    return (
        <div className="board-container">
            <Sidebar/>
            {isLoaded && (
                <div className="board-wrapper">
                    {/*<Sidebar/>*/}
                    <Information userData={board}/>
                </div>
            )}

        </div>
        /*</React.Fragment>*/
    );
}
export default Board;