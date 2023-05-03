import "../css/header.scss";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import {useEffect, useState} from "react";
import {setToken} from "../redux/AuthReducer";
import axios from "axios";


const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);

const Header = () => {

    const logo ="image/bugicare.png";
    const profile ="image/default-user-image.png";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.Auth.token);
    const [isAuth, setIsAuth] = useState(false);
    const [isManager, setIsManager] = useState(true);

    const [name,setName]=useState("");
    const getData = async () => {
        const {data} = await axios.get(`${url}/manager/1`);
        console.log("매니저 데이터 가져옴", data);
        setName(data.name);
    }
    useEffect(() => {
        getData()
    },[]);

    useEffect(() => {
        checkAuth();
    }, [token]);
    const checkAuth =()=>{
        if (jwtUtils.isAuth(token)) {
            setIsAuth(true);
            setName(jwtUtils.getUser(token));
        } else {
            setIsAuth(false);
        }
    }
    // 비동기로 처리!
    const logout = async () => {
        await dispatch(setToken(""));
        alert("로그아웃 되었습니다😎");
        navigate("/");
    };

    return (
        <div className="header-wrapper">
            <div className="header-title">
                <Link to="/">
                    <img style={{maxWidth: '50%'}} src={logo}/>
                </Link>
            </div>
            <div className="header-menu">
                <Link to="/pageUser?page=1">전체 관리</Link>
                <Link to="/add-board">등록하기</Link>
                {/*
                    isAuth는 토큰받았을때 사용 방식
                    isManager은 로그인 없이 사용방식
                */}
                {isAuth | isManager ? (
                    <>
                        <Link to="/myboard-list?page=1">내 관리</Link>
                        <Link to="#" onClick={logout}>로그아웃</Link>
                        <div className="header-image">
                            <Link to="/mypage"><img src={profile}/>{name} 님</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/sign-up">회원가입</Link>

                    </>
                )}




            </div>



        </div>
    );
};

export default Header;