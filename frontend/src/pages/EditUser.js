import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import ImageUploader from "../components/ImageUploader";
import api from "../utils/api";
import TextArea from "../components/TextArea";
import {Button} from "@mui/material";
import "../css/addUser.scss";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { url } from '../globals';
console.log("url = ",url);
const EditUser = () => {
    const token = useSelector(state => state.Auth.token);
    const navigate = useNavigate();
    const {board_id} = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");

    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "image/default_image.png",
    });

    useEffect(() => {
        const getBoard = async () => {
            const {data} = await axios.get(`${url}/user/${board_id}`);
            console.log(data)
            return data;
        }
        getBoard().then((result) => {
            setName(result.name);
            setAddress(result.address);
            setGender(result.gender);
            setAge(result.age);
            setPhone(result.phone);
            setImage({...image, preview_URL: `${url}/userImage/${board_id}`})
        });
    }, [])

    const canSubmit = useCallback(() => {
        return name !== "" && address !== "" && age !== ""&& phone !== ""&& gender !== "";
    }, [image, name,address,age,phone,gender]);

    const handleSubmit = useCallback(async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            // 이미지를 선택했을 때만 formdata에 넣음
            formData.append("file", image.image_file);
            // 수정할 땐 board_id를 보내자
            formData.append("id", board_id);
            await api.put("/api/board", formData);
            window.alert("😎수정이 완료되었습니다😎");
            // 이전 페이지로 돌아가기
            window.location.href = `/board/${board_id}`;
        } catch (e) {
            // 서버에서 받은 에러 메시지 출력
            toast.error("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭", {
                position: "top-center",
            });
        }

    }, [canSubmit]);

    return (
        <div className="addBoard-wrapper">
            <div className="addBoard-header">
                수정하기 🖊️
            </div>
            <div className="addBoard-box">

            <div className="submitButton">
                {canSubmit() ? (
                    <Button
                        onClick={handleSubmit}
                        className="success-button"
                        variant="outlined"
                    >
                        수정하기😃
                    </Button>
                ) : (
                    <Button
                        className="disable-button"
                        variant="outlined"
                        size="large"
                    >
                        내용을 모두 입력하세요😭
                    </Button>
                )}
            </div>
            <div className="addBoard-body">
                <ImageUploader setImage={setImage} preview_URL={image.preview_URL} type="user" />

                <TextArea setName={setName}setAddress={setAddress} setPhone={setPhone}setGender={setGender}setAge={setAge} name={name}gender={gender}age={age} address={address} phone={phone}/>

            </div>
            </div>
        </div>
    );
}

export default EditUser;