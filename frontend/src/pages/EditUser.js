import { useParams} from "react-router-dom";
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
const EditUser = () => {
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
            formData.append("file", image.image_file);
            formData.append("id", board_id);
            await api.put("/api/board", formData);
            window.alert("😎수정이 완료되었습니다😎");
            window.location.href = `/board/${board_id}`;
        } catch (e) {
            toast.error("오류발생!" + "😭", {
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