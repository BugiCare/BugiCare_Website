import "../css/home.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import Video from "./LiveVideo";


const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

const Home = () => {
    const [allNum, setAllNum] = useState(0);
    const [myNum, setMyNum] = useState(0);

    const logo ="image/bugicare.png";

    const getAllCount = async () => { //전체 인원 수 카운트
        const {data} = await axios.get(`${url}/allUser`);
        return data.length;
    }
    const getMyCount = async () => { // 내 담당 인원 수 카운트
        const {data} = await axios.get(`${url}/allUser`);
        console.log("데이터는 = ",data);
        let count=0;
        data.map((index)=>{
        if (index.manager_id === 1){
            count+=1;
        }})
        return count;
    }
    useEffect(()=>{
        getAllCount().then(result => setAllNum(result));
        getMyCount().then(result => setMyNum(result));

    },[])
    return (
        <div className="home-wrapper">
            <div className="home-title">
                <img style={{maxWidth: '100%' }} src={logo}/>
                <br/>
                <span>BugiCare 부기케어 </span>에 오신걸 환영합니다
            </div>
            <div className="my-website">
                <div className="my-website-title">전체 담당 인원 : {allNum} 명</div>
                <div className="my-website-title">내 담당 인원  : {myNum} 명</div>
                </div>
        </div>
    )
}
export default Home;