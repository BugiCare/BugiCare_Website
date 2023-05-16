import React, {useRef,useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from "../components/Sidebar";

const ProfilePhoto = styled.img`
  flex: 1;
  height: 450px;
  align-items: flex-start;
  width: 100%;
`;

const LiveVideo = () => {
    const [imageData, setImageData] = useState("./image/default_image.png");

    console.log("라이브 비디오 컴포넌트",imageData)

    const useInterval = (callback, delay) => {
        const savedCallback = useRef(null);

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            const executeCallback = () => {
                savedCallback.current();
            };

            const timerId = setInterval(executeCallback, delay);

            return () => clearInterval(timerId);
        }, []);
    };
    useInterval(() => {
        getImageData() ;
    }, 1000);
    const getImageData = () => {
        axios.get('http://3.36.218.186:5000/cctv').then(json => {
            const img = json.data;
            //console.log("######",img)

            setImageData(`data:image/png;base64,${img.img}`);
        })
    }

    return (
        <div className="board-container">
            <Sidebar/>
        <div className="board-wrapper">

            <div>
                <ProfilePhoto src={`${imageData}`} />
                {/*<ProfilePhoto source={{uri:`${imageData}`}} resizeMode="contain"/>*/}
            </div>

        </div>
        </div>

    )
}
export default LiveVideo;