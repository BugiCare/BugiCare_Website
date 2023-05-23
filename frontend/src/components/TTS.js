import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
import {Button, Dialog, DialogContent, IconButton, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import api from "../utils/api";
import {useLocation, useNavigate} from "react-router-dom";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "../css/comments.scss";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import EditDeleteBtn from "./EditDeleteBtn";
const TTS = ({board_id}) => {
    // 로그인 후 현재 경로로 돌아오기 위해 useLocation 사용
    const location = useLocation();
    const navigate = useNavigate();
    // 입력한 댓글 내용
    const [content, setContent] = useState("");
    // 현재 페이지, 전체 페이지 갯수
    const [TTSList, setTTSList] = useState([]);


    const [commentList, setCommentList] = useState([]);
    useEffect(() => {
        const getTTSList = async () => {
            const {data} = await axios.get(`http://localhost:8080/allTTS`);
            return data;
        }
        // 기존 commentList에 데이터를 덧붙임
        getTTSList().then((result) => setTTSList([...TTSList, ...result]));
    }, [])


    const submit = useCallback(async () => {
        const formData = new FormData();
        formData.append('name', content);

        axios.post(`http://localhost:8080/tts`,formData).then()
        /*axios
            .post('http://192.168.1.3:5000/tts', formData)
            .then(function (response) {
                console.log(response);
                console.log(formData);

            })
            .catch(function (error) {
                console.log(error);
            });*/

        alert("댓글 등록 완료");
        window.location.reload();
    }, [content]);
    console.log(commentList)
    /*modal 관련 코드*/
    // 로그인 후 돌아올 수 있게 현재 경로 세팅

    return (
        <div className="comments-wrapper">
            <div className="comments-header">
                <TextField
                    className="comments-header-textarea"
                    maxRows={3}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    multiline placeholder="댓글을 입력해주세요✏️"
                />
                {content !== "" ? (
                    <Button variant="outlined" onClick={submit}>등록하기</Button>
                ) : (
                    <Button variant="outlined" disabled={true}>
                        등록하기
                    </Button>
                )}
            </div>
            <div className="comments-body">
                {commentList != null ? commentList.map((item, index) => (

                    <div key={index} className="comments-comment">
                        <div className="comment-username">김한성</div>
                        <div className="comment-content">{item}</div>
                        <EditDeleteBtn item={item} name="tts"/>
                        <hr/>
                    </div>
                )): null}

            </div>




        </div>
    );
}
export default TTS;