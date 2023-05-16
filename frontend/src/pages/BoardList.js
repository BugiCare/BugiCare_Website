import {IconButton, Pagination} from "@mui/material";
import {Card} from "../components/Card";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import "../css/boardList.scss";
import moment from "moment";
import{IoIdCardOutline,IoIdCardSharp,IoListSharp,IoAppsShar,IoGridSharp} from "react-icons/io5"

import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './Arrow';
import styled from 'styled-components'
import Tables from "../components/Tables";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);
const BoardList = () => {
    const [pageCount, setPageCount] = useState(0);
    const [cardUserList, setCardUserList] = useState([]);
    const [tableUserList, setTableUserList] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const [mode, setMode] = useState(1);
console.log(mode);
    const getUserDataForCard = async () => {
        const page_number = searchParams.get("page");
        const {data} = await axios.get(`${url}/pageUser?page=${page_number}&offset=3`);
        //const {data} = await axios.get(`${url}/allUser`);
        return data;
    }
    const getUserDataForTable = async () => {
        const {data} = await axios.get(`${url}/allUser`);
        return data;
    }
    const getTotalBoard = async () => {
        const {data} = await axios.get(`${url}/allUser`);
        return data.length;
    }
    useEffect(() => {
        getUserDataForCard().then(result => setCardUserList(result));
        getUserDataForTable().then(result => setTableUserList(result));
        getTotalBoard().then(result => setPageCount(Math.ceil(result / 4)));
    }, [])

    return (
        <div className="board-box">
        {/*<div className="board-icon">
            <IconButton
                onMouseOver={() => {setIsOpen1(1);}}
                onMouseOut={() => {setIsOpen1(0);}}
            >
                <div className="a"style={{display:isOpen1 ?"block":"none"}}> 카드 형식</div>
                <IoGridSharp style={{width:"70%"}}/>
            </IconButton>

            <IconButton
                onMouseOver={() => {setIsOpen2(1);}}
                onMouseOut={() => {setIsOpen2(0);}}
            >
                <div className="a"style={{display:isOpen2 ?"block":"none"}}> 테이블 형식</div>
                <IoListSharp/>
            </IconButton>
        </div>*/}
            <div className="board-subMenu">
                <IconButton onClick={()=>setMode(1)}>
                    <IoIdCardSharp/>
                </IconButton>
                <IconButton onClick={()=>setMode(2)}>
                    <IoListSharp/>
                </IconButton>
                <IconButton onClick={()=>setMode(3)}>
                    <IoGridSharp style={{width:"70%"}}/>
                </IconButton>

            </div>
        <div className="boardList-wrapper">

            <div className="boardList-body">
                {/*<ScrollMenu>
                    {boardList.map((item) => (
                        <Card key={item.id} username={item.user.username} date={moment(item.createdAt).add(9, "hour").format('YYYY-MM-DD')}
                              name={item.name} address={item.address} content={item.content}
                              board_id={item.id} img_url={`/api/image/view/${item.id}`}
                        />
                    ))}
                </ScrollMenu>*/}
                {mode==1?
                    cardUserList.map((item) => (
                    <Card key={item.id} name={item.name} gender={item.gender}
                    age={item.age} address={item.address} phone={item.phone}
                    board_id={item.id} manager_id ={item.manager_id}/>
                    ))
                    :
                    <div className="boardList-table"><Tables userList={tableUserList} area="all"/></div>

                }
            </div>
            {mode==1?
            <div className="boardList-footer">
                <Pagination
                    variant="outlined" color="primary" page={Number(searchParams.get("page"))}
                    count={pageCount} size="large"
                    onChange={(e, value) => {
                        window.location.href = `/pageUser?page=${value}`;
                    }}
                    showFirstButton showLastButton
                />
            </div>:null
            }
        </div></div>
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