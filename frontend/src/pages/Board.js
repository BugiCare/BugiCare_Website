import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import "../css/board.scss";
import Information from "./Information";
import Sidebar from "../components/Sidebar";
import { url } from '../globals';

const Board = () => {
    // URL 파라미터 받기 - board의 id
    const {board_id} = useParams();
    const [board, setBoard] = useState({});

    const [isLoaded, setIsLoaded] = useState(false);


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