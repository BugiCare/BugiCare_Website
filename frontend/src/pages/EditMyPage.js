import React, {useEffect, useState} from "react";
import ImageUploader from "../components/ImageUploader";
import TextArea from "../components/TextArea";
import axios from "axios";
import "../css/EditprofileCard.scss";
import {Button} from "@mui/material";

import { url } from '../globals';

const EditMyPage = () => {
    const [name, setName] = useState("");
    const [center, setCenter] = useState("");
    const [phone, setPhone] = useState("");
    const [img, setImg] = useState({
        image_file: "",
        preview_URL: "image/kim.jpeg",
    });
    const authority="manager0"

    const getData = async () => {
        const {data} = await axios.get(`${url}/manager/1`);
        return data;
    }
    useEffect(() => {
        getData().then((result) => {
            setName(result.name);
            setCenter(result.center_name);
            setPhone(result.phone);

        });
    }, [])
    return(
        <div className="addBoard-wrapper">
            {/*<div className="addBoard-header">
                👨🏻‍🦳 마이 페이지 👵🏻
            </div>*/}

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
                </div>
            </div>

        </div>
    );



}

export default EditMyPage;