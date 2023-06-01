import React, {PureComponent, useEffect, useRef, useState} from 'react';
import {
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Bar,
    BarChart
} from 'recharts';

import axios from "axios";
import {url} from "../globals";
import {GiNightSleep} from "react-icons/gi";
import {BsEmojiSmile,BsEmojiFrown} from "react-icons/bs";
import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
const Graph = ({period,id}) => {

    const [isFall, setIsFall] = useState(false);
    const [show, setShow] = useState(false);

    let count;
    console.log(id)


    const [refriTime, setRefriTime] = useState([0, 0, 0, 0, 0, 0]);
    const [doorTime, setDoorTime] = useState([0, 0, 0, 0, 0, 0]);
    const [sleepTime, setSleepTime] = useState([1]);
    const [refriDay, setRefriDay] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [doorDay, setDoorDay] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [sleepDay, setSleepDay] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [refriWeek, setRefriWeek] = useState([0, 0, 0, 0]);
    const [doorWeek, setDoorWeek] = useState([0, 0, 0, 0]);
    const [sleepWeek, setSleepWeek] = useState([0, 0, 0, 0]);

    const analyzedData = {
        문열림: [doorTime, doorDay, doorWeek],
        수면시간: [
            //key
            sleepTime, //시간단위

            sleepDay, //일단뒤

            sleepWeek, //주단위
        ],

        냉장고열림: [refriTime, refriDay, refriWeek],
    };
    const [analyzeData, setAnalyzeData] = useState(analyzedData);
    function dic(a,b) {
        const c = a.map((name, index) => ({ name:a[index] , val: b[index] }));
        return c;
    }
    const getSleepTimeDay = async () => {
        await axios.get('http://15.164.7.163:8080/sleepTime/day').then(json => {

            const numberData = json.data.map((str: string) => parseInt(str));
            const numberReverse = numberData.reverse();

            console.log(json.data.reverse());
            setSleepTime(numberReverse);

        });
    }
    const recentData = async () => {
        await axios
            .get('http://15.164.7.163:8080/count/day/refrigerator')
            .then(json => {
                if (json.data.length == 6) {
                    const numberData = json.data.map((str: string) => parseInt(str));
                    const numberReverse = numberData.reverse();
                    const label=["6시간전","5시간전","4시간전","3시간전","2시간전","1시간전"];

                    console.log("$$$$$$$", dic(label,numberReverse))
                    setRefriTime(numberReverse);
                }
            });
        await axios
            .get('http://15.164.7.163:8080/count/week/refrigerator')
            .then(json => {
                if (json.data.length == 7) {
                    const numberData = json.data.map((str: string) => parseInt(str));
                    const numberReverse = numberData.reverse();
                    const label=["7일전","6일전","5일전","4일전","3일전","2일전","1일전"];
                    console.log("$$$$$$$", dic(label,numberReverse))
                    setRefriTime(numberReverse);
                    // console.log(json.data.reverse());
                    setRefriDay(numberReverse);
                }
            });
        await axios
            .get('http://15.164.7.163:8080/count/month/refrigerator')
            .then(json => {
                if (json.data.length == 4) {
                    const numberData = json.data.map((str: string) => parseInt(str));
                    const numberReverse = numberData.reverse();
                    const label=["4주전","3주전","2주전","1주전"];
                    console.log("$$$$$$$", dic(label,numberReverse))
                    setRefriTime(numberReverse);
                    // console.log(json.data.reverse());
                    setRefriWeek(numberReverse);
                }
            });
        await axios.get('http://15.164.7.163:8080/count/day/door').then(json => {
            if (json.data.length == 6) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["6시간전","5시간전","4시간전","3시간전","2시간전","1시간전"];
                console.log("$$$$$$$", dic(label,numberReverse))
                setRefriTime(numberReverse);
                // console.log(json.data.reverse());
                setDoorTime(numberReverse);
            }
        });
        await axios.get('http://15.164.7.163:8080/count/week/door').then(json => {
            if (json.data.length == 7) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["7일전","6일전","5일전","4일전","3일전","2일전","1일전"];
                console.log("$$$$$$$", dic(label,numberReverse))
                setRefriTime(numberReverse);
                // console.log(json.data.reverse());
                setDoorDay(numberReverse);
            }
        });
        await axios.get('http://15.164.7.163:8080/count/month/door').then(json => {
            if (json.data.length == 4) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["4주전","3주전","2주전","1주전"];
                console.log("$$$$$$$", dic(label,numberReverse))
                setRefriTime(numberReverse);
                // console.log(json.data.reverse());
                setDoorWeek(numberReverse);
            }
        });
        await axios.get('http://15.164.7.163:8080/sleepTime/week').then(json => {
            if (json.data.length == 7) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["7일전","6일전","5일전","4일전","3일전","2일전","1일전"];
                console.log("$$$$$$$", dic(label,numberReverse))
                setRefriTime(numberReverse);
                // console.log(json.data.reverse());
                setSleepDay(numberReverse);
            }
        });
        await axios.get('http://15.164.7.163:8080/sleepTime/month').then(json => {
            if (json.data.length == 4) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["4주전","3주전","2주전","1주전"];
                console.log("$$$$$$$", dic(label,numberReverse))
                setRefriTime(numberReverse);
                // console.log(json.data.reverse());
                setSleepWeek(numberReverse);
            }
        });
    };
    useEffect(() => {
        recentData();
        setAnalyzeData(analyzedData);
    }, []);

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
        recentData();
        setAnalyzeData(analyzedData);

    }, 3000);
    useInterval(() => {
        getSleepTimeDay();
        axios.get('http://15.164.7.163:8080/fallen').then(json => {
            const data = json.data;
            console.log("$$$$$$",data);
            setIsFall(data)

        });
        },1000)


    useEffect( ()=>{
        isFall == true ?
        setShow(true):setShow(false)
    },[]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <>
            {
                id =="sleep" && period =="day" ?
                 sleepDay ==0 && isFall == false?
                    <BsEmojiSmile style={{color:"grey",width:"inherit",height:"inherit"}}/> :
                     sleepDay ==0 && isFall == true?
                        <BsEmojiFrown style={{color:"red",width:"inherit",height:"inherit"}}/> : console.log("???") :null
            }
            {
                id =="sleep" && period =="day" ?
                    sleepDay ==1 && isFall == false?
                        <GiNightSleep style={{color:"grey",width:"inherit",height:"inherit"}}/> :
                        sleepDay ==1 && isFall == true?
                            <BsEmojiFrown style={{color:"red",width:"inherit",height:"inherit"}}/> : console.log("???") :null
            }
            {
                id == "sleep" ? period =="week" ?
                        <BarChart width={500} height={490} data={sleepDay}
                                  margin={{
                                      top: 15,
                                      right: 30,
                                      left: 20,
                                      bottom: 5,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="val" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>
                    : period =="month" ?
                        <PieChart width={500} height={500}>
                            <Pie
                                dataKey="val"
                                isAnimationActive={false}
                                data={sleepWeek}
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                innerRadius={75}
                                fill="#8884d8"
                                label
                            >
                            {sleepWeek.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                                </Pie>
                            <Tooltip />
                        </PieChart>:null:null
            }
            {
                id=="door" && period =="day" ?
                        <BarChart width={500} height={490} data={doorTime}
                                  margin={{
                                      top: 15,
                                      right: 30,
                                      left: 20,
                                      bottom: 5,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={"name"} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="val" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart> :
                    id=="door" && period=="week"?
                        <AreaChart
                            width={500}
                            height={500}
                            data={doorDay}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="val" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart> :
                        id=="door" && period =="month" ?
                            <PieChart width={500} height={500}>
                                <Pie
                                    dataKey="val"
                                    isAnimationActive={false}
                                    data={doorWeek}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    innerRadius={75}
                                    fill="#8884d8"
                                    label
                                >
                                    {doorWeek.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart> :null
            }
            {
                id=="refrigerator" && period =="day" ?
                    <BarChart width={500} height={490} data={refriTime}
                              margin={{
                                  top: 15,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="val" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart> :
                    id=="refrigerator" && period=="week"?
                        <AreaChart
                            width={500}
                            height={500}
                            data={refriDay}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="val" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart> :
                        id=="refrigerator" && period =="month" ?
                            <PieChart width={500} height={500}>
                                <Pie
                                    dataKey="val"
                                    isAnimationActive={false}
                                    data={refriWeek}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    innerRadius={75}
                                    fill="#8884d8"
                                    label
                                >
                                    {refriWeek.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart> :null
            }

            {
                    /*<Dialog open={show}>
                        <DialogContent style={{position: "relative"}}>
                            <IconButton
                                style={{position: "absolute", top: "0", right: "0"}}
                                onClick={() => {setShow(false)
                                    console.log(show)
                                }}
                            >
                                <DisabledByDefaultOutlinedIcon/>
                            </IconButton>
                            <div className="modal">

                            <div className="modal-title"> 어르신이 쓰러졌습니다 </div>
                                <div className="modal-button">

                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            setShow(false)
                                            console.log(show)
                                        }}
                                    >
                                        확인
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>*/

            }

            </>
        );

}
export default Graph;
