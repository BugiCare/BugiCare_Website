import React, { useState } from 'react';
function StreamViewer() {
    //const [streamUrl, setStreamUrl] = useState('http://192.168.0.4:8080/?action=stream');
    const [streamUrl, setStreamUrl] = useState('https://youtu.be/v1kxbDq1zT4');
//            <video src={streamUrl} autoPlay />
    return (
        <div>
            <video width='400' height='200' controls="controls" style={{alignItems:"center"}}>
                <source src={streamUrl} type="video/mp4"/>
            </video>

        </div>
    );
}

export default StreamViewer;
