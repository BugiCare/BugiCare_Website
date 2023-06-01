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
import CustomBtn from "../components/CustomBtn";
import Information from "./Information";

import Sidebar from "../components/Sidebar";

import { url } from '../globals';
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
            <Sidebar userData={board}/>
            {isLoaded && (
                <div className="board-wrapper">
                    <Information userData={board}/>
                </div>
            )}

        </div>
    );
}
export default Board;