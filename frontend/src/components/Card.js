import "../css/card.scss";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

import { url } from '../globals';

export const Card = ({board_id, name, address, gender, age, phone, manager_id}) => {

    const [profileImg,setProfileImg]=useState("");
    const navigate = useNavigate();
    const [managerData, setManagerData] = useState([]);

    const getManagerData = async () => {
        const {data} = await axios.get(`${url}/manager/${manager_id}`);
        return data;
    }
    useEffect(() => {
        // 현재 페이지에 해당하는 게시물로 상태 변경하기
        getManagerData().then(result=>setManagerData(result));



        axios.get(`${url}/userImage/${board_id}`,{responseType:'blob',})
            .then(response=>{
                const imageBlob =new Blob([response.data]);
                const imageUrl = URL.createObjectURL(imageBlob);
                setProfileImg(imageUrl);
            })
    },[])

    return (
        <div className="card-wrapper" onClick={() => {
            navigate(`/user/${board_id}`)
        }}>
            <div className="card-body-img">
                <img src={profileImg}/>
            </div>
            <div className="card-body-text">
                <div className="card-body-text-title">{name}</div>
                <div className="card-body-text-content">나이 : {age}세</div>
                <div className="card-body-text-content">성별 : {gender==="MALE"?"남성":"여성"}</div>
                <div className="card-body-text-content">주소 : {address}</div>
                <div className="card-body-text-content">번호 : {phone}</div>
            </div>

            <div className="card-footer">
                <div className="username">{managerData.name}</div>
                <div className="date">{managerData.center_name}</div>
            </div>
        </div>
    );
};
