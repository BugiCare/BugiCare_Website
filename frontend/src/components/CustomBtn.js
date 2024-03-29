import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import api from "../utils/api";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import React, { useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import {BsSend} from "react-icons/bs";
import axios from "axios";

import { url } from '../globals';
const CustomBtn =({item,name})=>{
    const [show, setShow] = useState(false);
    const [content,setContent] =useState(item.content);
    let USERID = "";
    switch (name){
        case "board":
            USERID = item.id;
            break;
        case "comment":
            USERID = item.user.id;
            break;
        case "tts":
            USERID = item;
            break;
    }
    const navigate = useNavigate();


    return(
        <div className="comments-wrapper">
            {
                <div className="comment-edit-delete-button">
                    <Button
                        variant="outlined" color="error" endIcon={<DeleteForeverOutlinedIcon/>}
                        className="delete-button"
                        onClick={async() => {
                            setShow(true);
                        }}
                    >
                        삭제
                    </Button>
                    {name==="board" ?
                    <Button
                        variant="outlined" endIcon={<BuildOutlinedIcon/>}
                        onClick={() => {
                            if(name==="board"){
                                navigate(`/edit-board/${item.id}`)
                            }

                        }}
                    >
                        수정
                    </Button>:null}
                    {name==="tts" ?
                        <Button
                            variant="outlined" endIcon={<BsSend/>}
                            onClick={() => {
                                const formData = new FormData();
                                formData.append('name', content);
                                axios
                                    .post('http://192.168.1.3:5000/tts', formData)
                                    .then(function (response) {

                                    })
                                    .catch(function (error) {

                                    });

                            }}
                        >
                            전송
                        </Button>:null}
                </div>
            }
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
                                    if(name==="board"){
                                        await api.delete(`/api/${name}/${item.id}`);
                                        alert("게시글이 삭제되었습니다😎");
                                        window.location.href="/myboard-list?page=1"
                                    }
                                    if(name==="comment"){
                                        alert("댓글이 삭제되었습니다😎");
                                        window.location.reload();
                                    }
                                    if(name==="tts"){
                                        await api.delete(`${url}/TTS/${item.id}`);
                                        alert("메시지가 삭제되었습니다😎");
                                        window.location.reload();
                                    }
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
        </div>
    );
}

export default CustomBtn;