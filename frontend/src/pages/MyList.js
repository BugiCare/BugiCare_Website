import {Pagination} from "@mui/material";
import {ProfileCard} from "../components/ProfileCard";
import {useEffect, useState} from "react";
import api from "../utils/api";
import {useSearchParams} from "react-router-dom";
import "../css/myList.scss";
import {useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import moment from "moment";
//=====================================

import Tables from "../components/Tables"
import {Card} from "../components/Card";
const MyList = () => {
    const [pageCount, setPageCount] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    // user의 id를 알아내기 위해 token 가져오기
    const token = useSelector(state => state.Auth.token);
    const [isAuth, setIsAuth] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        // 페이지에 해당하는 게시물 가져오기
        const getBoardList = async () => {
            const page_number = searchParams.get("page");
            const user_id = jwtUtils.getId(token);
            // 한 페이지에 원하는 개수 만큼 가져오기 위한 url. 테이블에서는 사용 안함
            //const {data} = await api.get(`/api/board/user/list?page_number=${page_number}&page_size=4&user_id=${user_id}`);
            const {data} = await api.get(`/api/board/user/list`);
            return data;
        }
        // 현재 페이지에 해당하는 게시물로 상태 변경하기
        getBoardList().then(result => setBoardList(result));
        // 게시물 전체 갯수 구하기
        const getTotalBoard = async () => {
            const user_id = jwtUtils.getId(token);
            const {data} = await api.get(`/api/board/user/count/${user_id}`);
            return data.total;
        }
        // 페이지 카운트 구하기: (전체 board 갯수) / (한 페이지 갯수) 결과 올림
        getTotalBoard().then(result => setPageCount(Math.ceil(result / 4)));


        if (jwtUtils.isAuth(token)) {
            setIsAuth(true);
            setName(jwtUtils.getUser(token));
        } else {
            setIsAuth(false);
        }}, [token]);


    return (
        <div className="myList-wrapper">
            <div className="myList-header">
                👨🏻‍🦳 내 관리 현황 👵🏻
            </div>
            <div className="myList-body">
                <div className="myList-profile">
                    <ProfileCard  managerName={name}
                                  img_url={"image/default-user-image.png"}/>
                </div>
                <div className="myList-table">
                    {boardList.length !=0 ?
                        <Tables userList={boardList}/>
                        : null
                    }
               </div>

            </div>
            {/*<div className="myList-footer">
                페이지네이션: count에 페이지 카운트, page에 페이지 번호 넣기
                <Pagination
                    variant="outlined" color="primary" page={Number(searchParams.get("page"))}
                    count={pageCount} size="large"
                    onChange={(e, value) => {
                        window.location.href = `/myboard-list?page=${value}`;
                    }}
                    showFirstButton showLastButton
                />
            </div>*/}
        </div>
    )
}
export default MyList;