import "../css/card.scss";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

export const Card = ({board_id, name, address, gender, age, phone}) => {

    const [profileImg,setProfileImg]=useState("");
    const [profileImg1,setProfileImg1]=useState("");
    const navigate = useNavigate();
    const getImage = async () => {
        const {data} = await axios.get(`${url}/userImage/${board_id}`,{responseType:'blob',})
        //console.log("44dd444",data);

        return data;
    }

    useEffect(() => {
        // 현재 페이지에 해당하는 게시물로 상태 변경하기

        getImage().then(response=>{
            console.log("4444",response);
            const imageBlob =new Blob([response.data]);
            const imageUrl = URL.createObjectURL(imageBlob);
            setProfileImg1(imageUrl);
        })

        axios.get(`http://localhost:8080/userImage/${board_id}`,{responseType:'blob',})
            .then(response=>{
                console.log("33333",response);
                const imageBlob =new Blob([response.data]);
                const imageUrl = URL.createObjectURL(imageBlob);
                setProfileImg(imageUrl);
            })
    },[])


    console.log("33333",profileImg1);
    console.log("44dd444",profileImg);

    return (
        <div className="card-wrapper" onClick={() => {
            //navigate(`/board/${board_id}`)
            navigate(`/user/${board_id}`)
        }}>
            <div className="card-body-img">
                <img src={profileImg}/>
            </div>
            <div className="card-body-text">
                <div className="card-body-text-title">{name}</div>
                <div className="card-body-text-content">{address}</div>
                <div className="card-body-text-content">{phone}</div>
            </div>

            <div className="card-footer">
                <div className="username">{name}</div>
                <div className="date">{gender}</div>
            </div>
        </div>
    );
};
