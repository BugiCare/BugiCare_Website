import React, {useEffect, useState} from "react";
import {jwtUtils} from "../utils/jwtUtils";
import {useSelector} from "react-redux";
import ImageUploader from "../components/ImageUploader";
import TextArea from "../components/TextArea";
import axios from "axios";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

const EditMyPage = () => {
    const [name, setName] = useState("");
    const [center, setCenter] = useState("");
    const [phone, setPhone] = useState("");
    const [img, setImg] = useState({
        image_file: "",
        preview_URL: "image/default-user-image.png",
    });
    const authority="manager"
    /* 토큰 사용
    const token = useSelector(state => state.Auth.token);
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (jwtUtils.isAuth(token)) {
            setIsAuth(true);
            setName(jwtUtils.getUser(token));
        } else {
            setIsAuth(false);
        }}, [token]);
        */
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

            <div className="addBoard-wrapper">
                <div className="addBoard-body">
                    <ImageUploader setImage={setImg} preview_URL={img.preview_URL} type="manager" />
                    <TextArea auth={authority}setName={setName} setCenter={setCenter} setPhone={setPhone} name={name} address={center} phone={phone}/>
                </div>
            </div>

        </div>
    );



}

export default EditMyPage;