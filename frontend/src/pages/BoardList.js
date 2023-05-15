import {IconButton, Pagination} from "@mui/material";
import {Card} from "../components/Card";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import "../css/boardList.scss";
import moment from "moment";
import{IoIdCardOutline,IoIdCardSharp,IoListSharp,IoAppsSharp} from "react-icons/io5"

import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './Arrow';
import styled from 'styled-components'

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);
const BoardList = () => {
    const [pageCount, setPageCount] = useState(0);
    const [userList, setUserList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen1,setIsOpen1]=useState(false);
    const [isOpen2,setIsOpen2]=useState(false);

    const getUserData = async () => {
        const page_number = searchParams.get("page");
        const {data} = await axios.get(`${url}/pageUser?page=${page_number}&offset=4`);
        return data;
    }
    const getTotalBoard = async () => {
        const {data} = await axios.get(`${url}/allUser`);
        return data.length;
    }
    useEffect(() => {
        getUserData().then(result => setUserList(result));
        getTotalBoard().then(result => setPageCount(Math.ceil(result / 4)));
    }, [])

    return (
        <div className="boardList-wrapper">
            <div className="boardList-header">
                👨🏻‍🦳 전체 관리 현황 👵🏻
            </div>
            {/*<div className="icon-text">
                <div className="a"style={{display:isOpen1 ?"block":"none"}}> 카드 형식</div>
                <div className="a"style={{display:isOpen2 ?"block":"none"}}> 테이블 형식</div>

            </div>*/}
            <div className="board-icon">
                <div className="a">정렬 방식 :</div>
                <IconButton
                    onMouseOver={() => {setIsOpen1(1);}}
                    onMouseOut={() => {setIsOpen1(0);}}
                >
                    <div className="a"style={{display:isOpen1 ?"block":"none"}}> 카드 형식</div>
                    <IoIdCardOutline/>
                </IconButton>
                <IconButton
                    onMouseOver={() => {setIsOpen2(1);}}
                    onMouseOut={() => {setIsOpen2(0);}}
                >
                    <div className="a"style={{display:isOpen2 ?"block":"none"}}> 테이블 형식</div>
                    <IoListSharp/>
                </IconButton>
                {/*<button>
                    <IoIdCardOutline/>

                    <IoIdCardSharp/>
                </button>*/}
            </div>

            <div className="boardList-body">
                {/*<ScrollMenu>
                    {boardList.map((item) => (
                        <Card key={item.id} username={item.user.username} date={moment(item.createdAt).add(9, "hour").format('YYYY-MM-DD')}
                              name={item.name} address={item.address} content={item.content}
                              board_id={item.id} img_url={`/api/image/view/${item.id}`}
                        />
                    ))}
                </ScrollMenu>*/}

                {userList.map((item) => (
                    <Card key={item.id} name={item.name} gender={item.gender}
                    age={item.age} address={item.address} phone={item.phone}
                    board_id={item.id} manager_id ={item.manager_id}
                    />
                ))}
            </div>
            <div className="boardList-footer">
                {/*페이지네이션: count에 페이지 카운트, page에 페이지 번호 넣기*/}
                <Pagination
                    variant="outlined" color="primary" page={Number(searchParams.get("page"))}
                    count={pageCount} size="large"
                    onChange={(e, value) => {
                        window.location.href = `/pageUser?page=${value}`;
                    }}
                    showFirstButton showLastButton
                />
            </div>
        </div>
    )
}
const Container = styled.div`
  overflow: hidden;
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export default BoardList;