import React, { useState,useEffect } from "react";
//import "./styles.css";
import { StlViewer } from "react-stl-viewer";



const STLViewer =() => {
    const Bugi ="image/BugiCare.stl";
    const [x, setX] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setX(prevX => prevX + 0.1);
        }, 100); // 10 seconds

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div style={{ width: '100%', height: '500px' }}>
            <div>
                <StlViewer

                    url={Bugi}


                    orbitControls
                    shadows={true}
                    style={{width: '30vw', height: '50vh'}}
                    modelProps={{scale:1.5,color:"#006699",positionX:150,positionY:150,rotationZ:`${x}`}}
                    floorProps={{gridWidth: 300}}
                    auto
                />
            </div>
        </div>
    );
}
export default STLViewer;