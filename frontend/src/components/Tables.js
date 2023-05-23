import React, {useEffect, useState} from 'react';

//material import
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Radio } from '@material-ui/core';
import '../css/myTable.scss';
import {TableContainer} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

const Tables = ({userList,area})=> {
    const TableRows = ({ children,event }) => {
        const navigate = useNavigate();
        const goRouteId = (board_id) => {
            console.log("클릭됨")
            navigate(`/user/${board_id}`);
        }
        return (
            <tr onClick={()=>{goRouteId(event)}} className="table-row">
                {children}
            </tr>
        )
    }

    //console.log("테이블 데이터 =",userList)
    const [profileImg,setProfileImg]=useState("");
    const [imgId,setImgId]=useState([]);
    const [imgId1,setImgId1]=useState(0);

    const getImage= async() => {
        imgId.map(async (id) => {
            console.log("#########입력받은 이미지 아이디=",id);
            await axios.get(`${url}/userImage/${id}`, {responseType: 'blob',})
                .then(response => {
                    console.log("33333", response);
                    const imageBlob = new Blob([response.data]);
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setProfileImg(imageUrl);
                })
        })
    }
    useEffect(()=>{
        //console.log("입력받은 이미지 아이디=",imgId);

        //getImage()


    },[imgId])
    imgId.map((i)=>{
        console.log("입력받은 이미지 아이디=",i);

    })
    //console.log("#########입력받은 이미지 아이디=",imgId);

    return (
            <TableContainer className="TableContainer">
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {area=="my"?
                        <TableCell className="table-head" align="center" colSpan="3"> 내 관리 리스트 </TableCell>
                            :
                            <TableCell className="table-head" align="center" colSpan="5"> 전체 관리 리스트 </TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {area=="my"?
                    userList.length !=0 ?
                          userList.map((user,index)=>{
                                const key = `upload-list-${index}`;
                                return (
                                    <TableRows key={key} event={user.id}>
                                        <TableCell className="table-profile" align="center">{<img src={`${url}/userImage/${user.id}`}/>}</TableCell>
                                        <TableCell className="table-body" align="center">{user.name}</TableCell>
                                        <TableCell className="table-body1" align="left">{user.address}</TableCell>
                                    </TableRows>
                                )
                            }) :
                        <div style={{fontSize:"1.5rem",width:"fit-content",padding:"20px",margin:"auto",cursor:"not-allowed"}}>관련 데이터 없음

                        </div>
                    :
                        area=="all"?
                            userList.length !=0 ?
                                userList.map((user,index)=>{
                                    const key = `upload-list-${index}`;
                                    return (
                                        <TableRows key={key} event={user.id}>
                                            <TableCell className="table-profile" align="center">{<img src={`${url}/userImage/${user.id}`}/>}</TableCell>
                                            <TableCell className="table-body" align="center">{user.name}</TableCell>
                                            <TableCell className="table-body" align="center">{user.age}</TableCell>
                                            <TableCell className="table-body" align="center">{user.gender=="MALE"?"남성":"여성"}</TableCell>
                                            <TableCell className="table-body1" align="left">{user.address}</TableCell>
                                        </TableRows>
                                    )
                                }) :

                            <div style={{fontSize:"1.5rem",width:"fit-content",padding:"20px",margin:"auto",cursor:"not-allowed"}}>
                                관련 데이터 없음
                            </div>

                                :null
                    }
                </TableBody>
            </Table>
            </TableContainer>
    );
};

export default Tables;