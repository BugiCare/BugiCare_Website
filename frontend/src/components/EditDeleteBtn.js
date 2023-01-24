import {jwtUtils} from "../utils/jwtUtils";
import {Button} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import api from "../utils/api";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const EditDeleteBtn =({item,name})=>{
    const navigate = useNavigate();
    const token = useSelector(state => state.Auth.token);
    console.log({item},name);
    return(
        <div className="comments-wrapper">
            {
                /*
                          해당 글의 작성자가 로그인을 했을 때만 수정, 삭제 버튼이 보이게 하자.
                          로그인을 한 사용자의 jwt-token에서 user의 ID를 추출한 후,
                          board(해당 글)의 user의 ID를 비교했을 때 같으면 수정, 삭제 버튼이 보이게 한다.
                          ID는 DB에 저장되어 있는 유저의 고유 번호이다.
                */
                jwtUtils.isAuth(token) && jwtUtils.getId(token) === item.user.id &&
                <div className="comment-edit-delete-button">
                    <Button
                        variant="outlined" color="error" endIcon={<DeleteForeverOutlinedIcon/>}
                        className="delete-button"
                        onClick={async() => {

                            await api.delete(`/api/${name}/${item.id}`);
                            if(name=="board"){
                                alert("게시글이 삭제되었습니다😎");
                                window.location.href="/board-list?page=1"
                            }
                            if(name=="comment"){
                                alert("댓글이 삭제되었습니다😎");
                                window.location.reload();
                            }
                        }}
                    >
                        삭제
                    </Button>
                    <Button
                        variant="outlined" endIcon={<BuildOutlinedIcon/>}
                        onClick={() => {
                            if(name=="board"){
                                navigate(`/edit-board/${item.id}`)
                            }

                        }}
                    >
                        수정
                    </Button>
                </div>
            }
        </div>
    );
}

export default EditDeleteBtn;