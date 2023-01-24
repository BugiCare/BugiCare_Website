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
                    {
                        /*
                          해당 글의 작성자가 로그인을 했을 때만 수정, 삭제 버튼이 보이게 하자.
                          로그인을 한 사용자의 jwt-token에서 user의 ID를 추출한 후,
                          board(해당 글)의 user의 ID를 비교했을 때 같으면 수정, 삭제 버튼이 보이게 한다.
                          ID는 DB에 저장되어 있는 유저의 고유 번호이다.
                         */
                        jwtUtils.isAuth(token) && jwtUtils.getId(token) === board.user.id &&
                        <div className="edit-delete-button">
                            <Button
                                variant="outlined" color="error" endIcon={<DeleteForeverOutlinedIcon/>}
                                className="delete-button"
                                onClick={() => {
                                    setShow(true)
                                }}
                            >
                                삭제
                            </Button>
                            <Button
                                variant="outlined" endIcon={<BuildOutlinedIcon/>}
                                onClick={() => {
                                    navigate(`/edit-board/${board_id}`)
                                }}
                            >
                                수정
                            </Button>
                        </div>
                    }
                    <div className="board-header">
                        <div className="board-header-username">{board.user.username}</div>
                        <div className="board-header-date">{moment(board.created).add(9,"hour").format('YYYY-MM-DD')}</div>
                    </div>
                    <hr/>
                    <div className="board-body">
                        <div className="board-image">
                            <img src={`/api/image/view/${board_id}`}/>
                        </div>
                        <div className="board-title-content">
                            <div className="board-title">{board.title}</div>
                            <div className="board-content">{board.content}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="board-footer"></div>
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