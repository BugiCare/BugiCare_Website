import "../css/header.scss";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import {useEffect, useState} from "react";
import {setToken} from "../redux/AuthReducer";

const Header = () => {
    const logo ="image/bugicare.png";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.Auth.token);
    const [isAuth, setIsAuth] = useState(false);
    const [name,setName]=useState("");
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
                <Link to="/board-list?page=1">전체 관리</Link>
                <Link to="/add-board">등록하기</Link>
                {isAuth ? (
                    <>
                        <Link to="/myboard-list?page=1">내 관리</Link>
                        <Link to="#" onClick={logout}>로그아웃</Link>
                        <Link to="/mypage">{name}님</Link>
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