import {ProfileCard} from "../components/ProfileCard";
import {useEffect, useState} from "react";
import "../css/myList.scss";

import Tables from "../components/Tables"
import axios from "axios";

import { url } from '../globals';

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




    return (
        <div className="myList-wrapper">
            <div className="myList-body">
                <div className="myList-profile">
                    <ProfileCard  managerName={name}
                                  img_url={"image/kim.jpeg"}/>
                </div>
                <div className="myList-table">
                    <Tables userList={myUserList} area="my"/>
               </div>

            </div>

        </div>
    )
}
export default MyList;