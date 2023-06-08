import React, {useState} from "react"
import {NavLink} from "react-router-dom";
import "../css/dropdown.scss";

const Dropdown =() =>{

    const menuItem=[
        {
            id:1,
            path:"/mypage",
            name:"마이페이지",

        },
        {
            id:2,
            path:"/sign-up",
            name:"회원가입",

        },
        {
            id:3,
            path:"/login",
            name:"로그인",

        },
        {
            id:4,
            path:"/#",
            name:"로그아웃",

        },
    ]
    const logout = async () => {
        alert("로그아웃 되었습니다😎");
        //navigate("/");
    };
    const [isOpen,setIsOpen]=useState(false);
    return(
        <div className="dropdown">
        {
            menuItem.map((item,index)=>(

            item.id ===4 ? <NavLink onClick={logout}
                to={item.path} key={index} className="dropdown-item" activeclassName="active">
                <div className="dropdown-text">{item.name}</div>
            </NavLink> : <NavLink
                to={item.path} key={index} className="dropdown-item" activeclassName="active">
                {/*<div style={{display:isOpen?"block":"none"}} className="dropdown-text">{item.name}</div>*/}
                <div className="dropdown-text">{item.name}</div>
            </NavLink>
            ))

        }
        </div>
    )
}
export default Dropdown;
