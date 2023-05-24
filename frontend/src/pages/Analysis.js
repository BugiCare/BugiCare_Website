import Sidebar from "../components/Sidebar";
import Chart from "./Chart";
import {IconButton} from "@mui/material";
import {FaBed} from "react-icons/fa";
import {CgSmartHomeRefrigerator} from "react-icons/cg";
import {BsDoorOpenFill} from "react-icons/bs";

import { useState} from "react";

const Analysis = () =>{
    const [mode, setMode] = useState(1);

    return(
            <div className="board-container">
                <Sidebar/>

                <div className="board-wrapper">
                    <div className="chart-board-subMenu">
                        <IconButton onClick={()=>setMode(1)}>
                            <BsDoorOpenFill style={{fontSize:"50px"}}/>
                        </IconButton>
                        <IconButton onClick={()=>setMode(2)}>
                            <FaBed style={{fontSize:"50px"}}/>
                        </IconButton>
                        <IconButton onClick={()=>setMode(3)}>
                            <CgSmartHomeRefrigerator style={{fontSize:"50px"}}/>
                        </IconButton>

                    </div>
                    <div className="chart-wrapper">
                        {mode==1?
                            <>
                                <Chart/>
                            </>:null}
                        {mode==2?
                            <>

                            </>:null}
                        {mode==3?
                            <>

                            </>:null}

                    </div>
                </div>
            </div>

    );
}

export default Analysis;