import EditDeleteBtn from "../components/EditDeleteBtn";
import moment from "moment/moment";
import Comments from "../components/Comments";
import React, {useEffect, useState} from "react";
import axios from "axios";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

const Information = (userData)=>{
    const [data,setData]=useState(userData.userData)
    const [profileImg,setProfileImg]=useState("");
    const [managerId,setManagerId]=useState(userData.userData.manager_id)
    const [ManagerData,setManagerData] = useState([])
    console.log(ManagerData)


    useEffect(() => {
        axios.get(`${url}/manager/${managerId}`).then(result=>setManagerData(result.data))
        axios.get(`${url}/userImage/${data.id}`,{responseType:'blob',})
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
                            <div className="board-header-username">담당자 : {ManagerData.name}</div>
                            {/*<div className="board-header-date">등록일 : {moment(data.updatedAt).add(9,"hour").format('YYYY-MM-DD HH:mm')}</div>*/}
                            <div className="board-header-date">{ManagerData.center_name} 소속</div>

                        </div>
                        <hr/>
                        <div className="board-body">
                            <div className="board-image">
                                <img src={profileImg}/>
                            </div>
                            <div className="board-title-content">
                                <div className="board-title">성함 : {data.name}</div>
                                <div className="board-content">나이 : {data.age}세</div>
                                <div className="board-content">주소 : {data.address}</div>
                                <div className="board-content">특이사항 : {data.content}</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="board-footer">
                            <Comments board_id={data.id}/>
                        </div>
                    </div>
    )

}
export default Information;