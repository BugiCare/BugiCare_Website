import "../css/home.scss";
import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
    const [number, setNumber] = useState(0);

    useEffect(()=>{
        const getTotal = async () => {
            const {data} = await axios.get("/api/board/count");
            return data.total;
        }
        getTotal().then(result => setNumber(result));

    },[])
    return (
        <div className="home-wrapper">
            <div className="home-title">
                <span>BugiCare</span>에 오신걸 환영합니다
            </div>


            <div className="my-website">
                <div className="my-website-title">관리 인원 : {number} 명</div>
                <div className="my-website-title">위급 상황 : {number} 명</div>
            </div>
        </div>
    )
}
export default Home;