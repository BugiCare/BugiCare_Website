import "../css/note.scss";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

const Note = ({board_id, name, manager_id}) => {

    const [profileImg,setProfileImg]=useState("");
    const [profileImg1,setProfileImg1]=useState("");
    const navigate = useNavigate();
    const [managerData, setManagerData] = useState([]);

    const getImage = async () => {
        const {data} = await axios.get(`${url}/userImage/${board_id}`,{responseType:'blob',})
        return data;
    }
    const getManagerData = async () => {
        const {data} = await axios.get(`${url}/manager/${manager_id}`);
        console.log("데이터 개수는? ",data);
        return data;
    }
    useEffect(() => {
        // 현재 페이지에 해당하는 게시물로 상태 변경하기
        getManagerData().then(result=>setManagerData(result));

        getImage().then(response=>{
            console.log("4444",response);
            const imageBlob =new Blob([response.data]);
            const imageUrl = URL.createObjectURL(imageBlob);
            setProfileImg1(imageUrl);
        })

        axios.get(`${url}/userImage/${board_id}`,{responseType:'blob',})
            .then(response=>{
                console.log("33333",response);
                const imageBlob =new Blob([response.data]);
                const imageUrl = URL.createObjectURL(imageBlob);
                setProfileImg(imageUrl);
            })
    },[])


    console.log("44dd444",profileImg);

    return (
        <div className="note-wrapper" onClick={() => {
            navigate(`/user/${board_id}`)
        }}>
            <div className="note-body-img">
                <img src={profileImg}/>
            </div>
            {/*<div className="note-body-text">
                <div className="note-body-text-title">{name}</div>

            </div>*/}

            <div className="note-footer">
                <div className="note-body-text-title">{name}</div>

                {/*<div className="username">{managerData.name}</div>
                <div className="date">{managerData.center_name}</div>*/}
            </div>
        </div>
    );
};
export default Note;