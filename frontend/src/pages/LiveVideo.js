import React, {useRef,useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfilePhoto = styled.img`
  flex: 1;
  height: 150px;
  align-items: flex-start;
  width: 100%;
`;

const LiveVideo = () => {
    const [imageData, setImageData] = useState('');


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
        //getImageData() ;
    }, 5000);
    const getImageData = () => {
        axios.get('http://3.36.218.186:5000/cctv').then(json => {
            const img = json.data;
            setImageData(`data:image/png;base64,${img.img}`);
        })
    }

    return (
        <div>
            <iframe style={{"width":"500px","height":"500px"}} src={`http://192.168.1.3:8090/?action=stream`}/>
            <div>
                <ProfilePhoto src={`${imageData}`} />
                <ProfilePhoto source={{uri:`${imageData}`}} resizeMode="contain"/>
            </div>
        </div>
    )
}
export default LiveVideo;