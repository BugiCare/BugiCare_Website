import React, {useState} from "react"
import{FaUser,FaVideo, FaChartLine} from "react-icons/fa"
import {NavLink, useParams} from "react-router-dom";
import "../css/sidebar.scss"
import styled from "styled-components";
import Information from "../pages/Information";

const url="http://15.164.7.163:8080";
//const url="http://localhost:8080";
console.log("url = ",url);
const Sidebar =(userData) =>{
    const [data,setData] = useState(userData);
    const [isHovering, setIsHovering] = useState(0);
    const [isClick, setIsClick] = useState(1);
    //const [isClick, setIsClick] = useReducer();


    const {board_id} = useParams();
    const [isOpen,setIsOpen]=useState(false);
    //const [isHover, setIsHover] = useState({1:0,2:0,3:0});
    const [isHover, setIsHover] = useState([{ 1:0},{ 2:0}]);

    console.log(isHover)

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
            path:`/user/${board_id}/chart`,
            name:"analysis",
            icon:<FaChartLine/>
        },
        {
            id:3,
            path:`/user/${board_id}/cctv`,
            name:"Video",
            icon:<FaVideo/>
        },
    ]

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
                            onMouseOver={()=>setIsHover(item.id,1)}
                            onMouseOut={() => setIsHover(item.id,0)}
                            to={item.path} key={index} className="link" activeclassName="active">
                            <div style={{display:isHover[item.id] ?"block":"none"}} className="link-text">{item.name}</div>
                            <div className="icon">{item.icon}</div>
                        </NavLink>
                    ))

                }
            </div>

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