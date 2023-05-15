import {jwtUtils} from "../utils/jwtUtils";
import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import api from "../utils/api";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import axios from "axios";

const EditDeleteBtn =({item,name})=>{
    const [show, setShow] = useState(false);
    let USERID = "";
    switch (name){
        case "board":
            USERID = item.id;
            break;
        case "comment":
            USERID = item.user.id;
            break;
    }
    const navigate = useNavigate();
    const token = useSelector(state => state.Auth.token);
    console.log("딜리트 버튼 아이디 식별 =",USERID);
    console.log("카테고리",item);

    return(
        <div className="comments-wrapper">
            {
                /*jwtUtils.isAuth(token) && jwtUtils.getId(token) === USERID &&*/
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
                    {name=="board" ?
                    <Button
                        variant="outlined" endIcon={<BuildOutlinedIcon/>}
                        onClick={() => {
                            if(name=="board"){
                                navigate(`/edit-board/${item.id}`)
                            }

                        }}
                    >
                        수정
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
                                    await api.delete(`/api/${name}/${item.id}`);
                                    if(name=="board"){
                                        alert("게시글이 삭제되었습니다😎");
                                        window.location.href="/myboard-list?page=1"
                                    }
                                    if(name=="comment"){
                                        alert("댓글이 삭제되었습니다😎");
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

export default EditDeleteBtn;