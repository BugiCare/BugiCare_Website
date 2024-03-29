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
    const [imageData, setImageData] = useState("../../image/default_image.png");


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
    }, 100);
    const getImageData = () => {
        axios.get('http://3.36.218.186:5000/cctv').then(json => {
            const img = json.data;

            setImageData(`data:image/png;base64,${img.img}`);
        })
    }

    return (
        <div className="board-container">
            <Sidebar/>
        <div className="board-wrapper">
            <div className="video-wrapper">
                <ProfilePhoto src={`${imageData}`} />
            </div>
        </div>
        </div>
    )
}
export default LiveVideo;