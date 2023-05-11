import React, {useEffect, useState} from "react"
import{FaUser,FaVideo, FaChartLine} from "react-icons/fa"
import {NavLink, useParams} from "react-router-dom";
import "../css/sidebar.scss"
import styled from "styled-components";
const Sidebar =({childern}) =>{
    const [isHovering, setIsHovering] = useState(0);
    const [isClick, setIsClick] = useState(0);


    const {board_id} = useParams();
    const [isOpen,setIsOpen]=useState(false);

    const toggle=()=>setIsOpen(!isOpen)
    const menuItem=[
        {
            id:1,
            path:`/user/${board_id}`,
            name:"information",
            icon:<FaUser/>
        },
        {
            id:2,
            path:`/user/${board_id}`,
            name:"analysis",
            icon:<FaChartLine/>
        },
        {
            id:3,
            path:`/user/${board_id}`,
            name:"Video",
            icon:<FaVideo/>
        },
    ]
    //console.log("@@@@@",isHovering,isClick)

    return(
        <div className="sidebar-container">
            <Button clicked={isOpen} onClick={() => toggle()}>
                Click
            </Button>
            <div style={{width:isOpen?"-100px":"60px"}} className="sidebar">

                {
                    menuItem.map((item,index)=>(
                        <NavLink
                            onClick={()=>{setIsClick(item.id);}}
                            onMouseOver={() => {setIsHovering(1);}}
                            onMouseOut={() => setIsHovering(0)}
                            to={item.path} key={index} className="link" activeclassName="active">
                            <div style={{display:isOpen ?"block":"none"}} className="link-text">{item.name}</div>
                            <div className="icon">{item.icon}</div>
                        </NavLink>
                    ))

                }

            </div>
            <main>{childern}</main>
        </div>
    )
}
export default Sidebar;

const Button = styled.button`
  background-color: grey;
  color:grey;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  :hover{
    background-color: black;
    color: black;
  }
  &::before,
  &::after {
    content: "";
    background-color: white;
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;