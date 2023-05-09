import EditDeleteBtn from "../components/EditDeleteBtn";
import moment from "moment/moment";
import Comments from "../components/Comments";
import React, {useEffect, useState} from "react";
import axios from "axios";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

const Information = (data)=>{
    const [item,setItem]=useState(data)
    const [profileImg,setProfileImg]=useState("");

    console.log("정보 데이터",data)
    console.log("정보 데이터",data.data.id)

    useEffect(() => {
        axios.get(`${url}/userImage/${data.data.id}`,{responseType:'blob',})
            .then(response=>{
                console.log("33333",response);
                const imageBlob =new Blob([response.data]);
                const imageUrl = URL.createObjectURL(imageBlob);
                setProfileImg(imageUrl);
            })
    },[]);
    return(
        <div className="information">
                        <EditDeleteBtn item={data} name="board"/>
                        <div className="board-header">
                            <div className="board-header-username">담당자 : {data.data.name}</div>
                            <div className="board-header-date">등록일 : {moment(data.updatedAt).add(9,"hour").format('YYYY-MM-DD HH:mm')}</div>
                        </div>
                        <hr/>
                        <div className="board-body">
                            <div className="board-image">
                                <img src={profileImg}/>
                            </div>
                            <div className="board-title-content">
                                <div className="board-title">성함 : {data.data.name}</div>
                                <div className="board-content">나이 : 80세</div>
                                <div className="board-content">주소 : {data.data.address}</div>
                                <div className="board-content">특이사항 : {data.data.content}</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="board-footer">
                            <Comments board_id={data.data.id}/>
                        </div>
                    </div>
    )

}
export default Information;