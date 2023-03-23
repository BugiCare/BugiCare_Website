import React, {useEffect, useState} from "react";
import {jwtUtils} from "../utils/jwtUtils";
import {useSelector} from "react-redux";
import ImageUploader from "../components/ImageUploader";
import TextArea from "../components/TextArea";

const EditMyPage = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState({
        image_file: "",
        preview_URL: "image/default-user-image.png",
    });

    const token = useSelector(state => state.Auth.token);
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (jwtUtils.isAuth(token)) {
            setIsAuth(true);
            setName(jwtUtils.getUser(token));
        } else {
            setIsAuth(false);
        }}, [token]);

    return(
        <div className="boardList-wrapper">
            <div className="boardList-header">
                👨🏻‍🦳 마이 페이지 👵🏻
            </div>

            <div className="addBoard-wrapper">
                <div className="addBoard-body">
                    <ImageUploader setImage={setImg} preview_URL={img.preview_URL} type="manager" />
                    <TextArea setName={setName} setAddress={setAddress} setContent={setContent} name={name} address={address} content={content}/>
                </div>
            </div>

        </div>
    );



}

export default EditMyPage;