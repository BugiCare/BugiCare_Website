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
const Board = () => {
    // URL 파라미터 받기 - board의 id
    const {board_id} = useParams();
    const [board, setBoard] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const token = useSelector(state => state.Auth.token);
    const navigate = useNavigate();
    // modal이 보이는 여부 상태
    const [show, setShow] = useState(false);
    // board 가져오기
    useEffect(() => {
        const getBoard = async () => {
            const {data} = await axios.get(`/api/board/${board_id}`);
            console.log(data);
            return data;
        }
        getBoard().then(result => setBoard(result)).then(() => setIsLoaded(true));
    }, [])


    return (
        <React.Fragment>
            {isLoaded && (
                <div className="board-wrapper">
                    <EditDeleteBtn item={board} name="board"/>
                    <div className="board-header">
                        <div className="board-header-username">관리자 : {board.user.username}</div>
                        <div className="board-header-date">{moment(board.updatedAt).add(9,"hour").format('YYYY-MM-DD HH:mm')}</div>
                    </div>
                    <hr/>
                    <div className="board-body">
                        <div className="board-image">
                            <img src={`/api/image/view/${board_id}`}/>
                        </div>
                        <div className="board-title-content">
                            <div className="board-title">{board.name}</div>
                            <div className="board-content">주소 : {board.address}</div>
                            <div className="board-content">{board.content}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="board-footer">
                        {/* ==========댓글 보이는 부분=========== */}
                        <Comments board_id={board_id}/>
                    </div>
                </div>
            )}
            {/*modal*/}
            <Dialog open={show}>
                <DialogContent style={{position: "relative"}}>
                    <IconButton
                        style={{position: "absolute", top: "0", right: "0"}}
                        onClick={() => setShow(false)}
                    >
                        <DisabledByDefaultOutlinedIcon/>
                    </IconButton>
                    <div className="modal">
                        <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
                        <div className="modal-button">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={async () => {
                                    setShow(false);
                                    // 모달의 예 버튼 클릭시 게시물 삭제
                                    await api.delete(`/api/board/${board_id}`);
                                    alert("게시물이 삭제되었습니다😎");
                                    const value=1;
                                    //navigate(`/board-list?page=${value}`);
                                    window.location.href=`/myboard-list?page=${value}`;
                                }}
                            >
                                예
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                아니오
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
export default Board;