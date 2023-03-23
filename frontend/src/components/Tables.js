import React from 'react';

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

const Tables = ({userList})=> {
    const TableRows = ({ children,event }) => {
        const navigate = useNavigate();
        const goRouteId = (board_id) => {
            console.log("클릭됨")
            navigate(`/board/${board_id}`);
        }
        return (
            <tr onClick={()=>{goRouteId(event)}} className="table-row">
                {children}
            </tr>
        )
    }
    return (
            <TableContainer className="TableContainer">
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell className="table-head" align="center" colSpan="3"> 내 관리 리스트 </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((user,index)=>{
                        const key = `upload-list-${index}`;
                        return (
                            <TableRows key={key} event={user.id}>
                                <TableCell className="table-profile" align="center">{<img src={`/api/image/view/${user.id}`}/>}</TableCell>
                                <TableCell className="table-body" align="center">{user.name}</TableCell>
                                <TableCell className="table-body1" align="left">{user.address}</TableCell>
                            </TableRows>
                        )
                    })}
                    {/*<TableRow>
                        <TableCell align="center">{<img style={{width:"30%"}} src={img_url}/>}</TableCell>
                        <TableCell align="center">{username}</TableCell>
                        <TableCell align="center">{username}</TableCell>
                    </TableRow>*/}
                </TableBody>
            </Table>
            </TableContainer>
    );
};

export default Tables;