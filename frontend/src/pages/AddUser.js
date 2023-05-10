import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCallback, useState} from "react";
import ImageUploader from "../components/ImageUploader";
import api from "../utils/api";
import {jwtUtils} from "../utils/jwtUtils";
import TextArea from "../components/TextArea";
import {Button} from "@mui/material";
import "../css/addUser.scss";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
    const token = useSelector(state => state.Auth.token);
    const navigate = useNavigate();

    // 게시판 제목, 내용, 사진
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");

    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "image/default_image.png",
    });
    const canSubmit = useCallback(() => {
        return image.image_file !== "" && age !== "" && name !== "" && address !== ""&& gender !== ""&& phone !== "";
    }, [image, name,address, age,gender,phone]);

    const handleSubmit = useCallback(async () => {
        try{
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            formData.append("phone", phone);
            formData.append("age", age);
            formData.append("gender", gender);
            formData.append("file", image.image_file);
            formData.append("manager_id", jwtUtils.getId(token));

            await api.post("/api/board", formData);
            window.alert("😎등록이 완료되었습니다😎");
            //navigate("/board-list");
            const value=1;
            navigate(`/board-list?page=${value}`);
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
                유저 등록하기 🖊️
            </div>
            <div className="submitButton">
                {canSubmit() ? (
                    <Button
                        onClick={handleSubmit}
                        className="success-button"
                        variant="outlined"
                    >
                        등록하기😃
                    </Button>
                ) : (
                    <Button
                        className="disable-button"
                        variant="outlined"
                        size="large"
                    >
                        사진과 내용을 모두 입력하세요😭
                    </Button>
                )}
            </div>
            <div className="addBoard-body">
                <ImageUploader setImage={setImage} preview_URL={image.preview_URL} type="user" />
                <TextArea setName={setName}setAddress={setAddress} setPhonet={setPhone}setGender={setGender}setAge={setAge} name={name}gender={gender}age={age} address={address} phone={phone}/>
            </div>
        </div>
    );
}

export default AddUser;