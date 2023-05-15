import React, {useEffect, useState} from "react";
import ImageUploader from "../components/ImageUploader";
import TextArea from "../components/TextArea";
import axios from "axios";
import "../css/EditprofileCard.scss";
import {Button} from "@mui/material";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

const EditMyPage1 = () => {
    const [name, setName] = useState("");
    const [center, setCenter] = useState("");
    const [phone, setPhone] = useState("");
    const [img, setImg] = useState({
        image_file: "",
        preview_URL: "image/default-user-image.png",
    });
    const authority="manager0"

    const getData = async () => {
        const {data} = await axios.get(`${url}/manager/1`);
        console.log("매니저 데이터 가져옴", data);
        return data;
    }
    useEffect(() => {
        getData().then((result) => {
            setName(result.name);
            setCenter(result.center_name);
            setPhone(result.phone);
            // 이미지는 파일을 불러올 필요가 없이 미리보기 url만 가져온다.
            // 이미지를 선택하지 않고 올리면 db에 저장되어 있는 이미지를 그대로 사용!
            //setImage({...image, preview_URL: `/api/image/view/${board_id}`})
        });
    }, [])
    return(
        <div className="boardList-wrapper">
            <div className="boardList-header">
                👨🏻‍🦳 마이 페이지 👵🏻
            </div>

            <div className="editBoard-wrapper">
                <div className="editBoard-body">
                    <div className="edit-profile-button">
                        <div className="submitButton">
                            <Button
                                //onClick={handleSubmit}
                                className="success-button"
                                variant="outlined"
                            >
                                저장하기😃
                            </Button>
                        </div>
                    </div>
                    {/*<ImageUploader setImage={setImg} preview_URL={img.preview_URL} type="manager" />*/}
                    <div className="edit-profile-wrapper">

                        <div className="edit-profile-body-img">
                            {/*<img src={img.preview_URL}/>*/}
                            <ImageUploader setImage={setImg} preview_URL={img.preview_URL} type="user" />

                        </div>
                        <div className="edit-profile-body-text">
                            <div className="edit-profile-body-text-title">
                                이름 : &nbsp;
                                <input
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                className="edit-manager-input"
                                placeholder="이름을 입력하세요"
                                value={name}/>
                            </div>
                            <div className="edit-profile-body-text-title">
                                소속 : &nbsp;
                                <input
                                    onChange={(e) => {
                                        setCenter(e.target.value);
                                    }}
                                    className="edit-manager-input"
                                    placeholder="센터 이름을 입력하세요"
                                    value={center}/>
                            </div>
                            <div className="edit-profile-body-text-title">
                                번호 : &nbsp;
                                <input
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                    className="edit-manager-input"
                                    placeholder="핸드폰 번호를 입력하세요"
                                    value={phone}/>
                            </div>

                        </div>



                    </div>

                    {/*<TextArea auth={authority}
                              setName={setName}
                              setAddress={setCenter}
                              setContent={setPhone}
                              name={name}
                              address={center}
                              content={phone}/>*/}
                </div>
            </div>

        </div>
    );



}

export default EditMyPage1;