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
import axios from "axios";

import { url } from '../globals';
console.log("url = ",url);

const MyList = () => {
    const [myUserList, setMyUserList] = useState([]);
    const [name, setName] = useState("");



    const getMyUserData = async () => {
        const {data} = await axios.get(`${url}/myUser?id=1`);
        return data;
    }
    const getManagerData = async () => {
        const {data} = await axios.get(`${url}/manager/1`);
        return data.name;
    }
    useEffect(() => {
        getMyUserData().then(result => setMyUserList(result));
        getManagerData().then(result => setName(result));
    }, [])
    console.log("내관리 리스트 = ",myUserList)




    return (
        <div className="myList-wrapper">
            <div className="myList-body">
                <div className="myList-profile">
                    <ProfileCard  managerName={name}
                                  img_url={"image/kim.jpeg"}/>
                </div>
                <div className="myList-table">
                    {/*{myUserList.length !=0 ?
                        <Tables userList={myUserList}/>
                        : null
                    }*/}

                    <Tables userList={myUserList} area="my"/>

                   {/*{myUserList.map((item) => (
                        <Tables userList={item}/>

                    ))}*/}
               </div>

            </div>

        </div>
    )
}
export default MyList;