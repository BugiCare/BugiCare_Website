import {IconButton} from "@mui/material";
import {Card} from "../components/Card";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import "../css/boardList.scss";
import{IoIdCardSharp,IoListSharp,IoGridSharp} from "react-icons/io5"
import React from 'react';
import Tables from "../components/Tables";
import Note from "../components/Note";
import "../css/allTable.scss";

import { url } from '../globals';
import CustomSwiper from "../components/CustomSwiper";
import {SwiperSlide} from "swiper/react";
const BoardList = () => {
    const [pageCount, setPageCount] = useState(0);
    const [cardUserList, setCardUserList] = useState([]);
    const [tableUserList, setTableUserList] = useState([]);
    const [postUserList, setPostUserList] =useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [mode, setMode] = useState(1);
    const getUserDataForCard = async () => {
        const page_number = searchParams.get("page");
        //const {data} = await axios.get(`${url}/pageUser?page=${page_number}&offset=3`);
        const {data} = await axios.get(`${url}/allUser`);
        return data;
    }
    const getUserDataForTable = async () => {
        const {data} = await axios.get(`${url}/allUser`);
        return data;
    }
    const getUserDataForNote = async () => {
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
        getUserDataForNote().then(result => setPostUserList(result));
        getTotalBoard().then(result => setPageCount(Math.ceil(result / 4)));
    }, [])

    return (
        <>
        <div className="boardList-wrapper">
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
            {mode==1?
                <>
                    <div className="boardList-card">
                        <CustomSwiper id={"card"}>
                            {cardUserList.map((item) => (
                                <SwiperSlide><Card key={item.id} name={item.name} gender={item.gender}
                                                   age={item.age} address={item.address} phone={item.phone}
                                                   board_id={item.id} manager_id ={item.manager_id}/></SwiperSlide>
                            ))}
                        </CustomSwiper>
                    </div>

                </> : null}
            {mode==2?
                    <div className="boardList-table"><Tables userList={tableUserList} area="all"/></div>
                    : null}
            {mode==3?
                        <div className="boardList-note">
                            {postUserList.map((item) => (
                                <Note key={item.id} name={item.name}
                                      board_id={item.id} manager_id ={item.manager_id}/>))}
                        </div>
                        :null}

        </div>
        </>
    )
}


export default BoardList;