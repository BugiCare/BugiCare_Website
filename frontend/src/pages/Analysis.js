import Sidebar from "../components/Sidebar";
import {IconButton} from "@mui/material";
import {FaBed} from "react-icons/fa";
import {CgSmartHomeRefrigerator} from "react-icons/cg";
import {BsDoorOpenFill} from "react-icons/bs";

import { useState} from "react";
import CustomSwiper from "../components/CustomSwiper";

const Analysis = () =>{
    const [mode, setMode] = useState(1);

    return(
            <div className="board-container">
                <Sidebar/>

                <div className="board-analysis-wrapper">
                    <div className="chart-board-subMenu">
                        <IconButton onClick={()=>setMode(1)}>
                            <BsDoorOpenFill style={{fontSize:"40px"}}/>
                        </IconButton>
                        <IconButton onClick={()=>setMode(2)}>
                            <FaBed style={{fontSize:"40px"}}/>
                        </IconButton>
                        <IconButton onClick={()=>setMode(3)}>
                            <CgSmartHomeRefrigerator style={{fontSize:"40px"}}/>
                        </IconButton>

                    </div>
                    <div className="chart-wrapper">
                        {mode===1?
                            <>
                                <CustomSwiper id={"door"}/>
                            </>:null}
                        {mode===2?
                            <>
                                <CustomSwiper id={"sleep"}/>
                            </>:null}
                        {mode===3?
                            <>
                                <CustomSwiper id={"refrigerator"}/>
                            </>:null}

                    </div>
                </div>
            </div>

    );
}

export default Analysis;