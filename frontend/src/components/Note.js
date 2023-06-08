import "../css/note.scss";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

import { url } from '../globals';

const Note = ({board_id, name, manager_id}) => {

    const [profileImg,setProfileImg]=useState("");
    const navigate = useNavigate();
    const [managerData, setManagerData] = useState([]);


    const getManagerData = async () => {
        const {data} = await axios.get(`${url}/manager/${manager_id}`);
        return data;
    }
    useEffect(() => {
        getManagerData().then(result=>setManagerData(result));

        axios.get(`${url}/userImage/${board_id}`,{responseType:'blob',})
            .then(response=>{
                const imageBlob =new Blob([response.data]);
                const imageUrl = URL.createObjectURL(imageBlob);
                setProfileImg(imageUrl);
            })
    },[])



    return (
        <div className="note-wrapper" onClick={() => {
            navigate(`/user/${board_id}`)
        }}>
            <div className="note-body-img">
                <img src={profileImg}/>
            </div>

            <div className="note-footer">
                <div className="note-body-text-title">{name}</div>
            </div>
        </div>
    );
};
export default Note;