import React, { useEffect, useRef, useState} from 'react';
import {
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,
    BarChart
} from 'recharts';

import axios from "axios";
import {url} from "../globals";
import {GiNightSleep} from "react-icons/gi";
import {BsEmojiSmile,BsEmojiFrown} from "react-icons/bs";
const Graph = ({period,id}) => {

    const [isFall, setIsFall] = useState(false);

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
        await axios.get(`${url}/sleepTime/day`).then(json => {
            const numberData = json.data.map((str: string) => parseInt(str));
            const numberReverse = numberData.reverse();
            setSleepTime(numberReverse);

        });
    }
    const recentData = async () => {
        await axios
            .get(`${url}/count/day/refrigerator`)
            .then(json => {
                if (json.data.length === 6) {
                    const numberData = json.data.map((str: string) => parseInt(str));
                    const numberReverse = numberData.reverse();
                    const label=["6시간전","5시간전","4시간전","3시간전","2시간전","1시간전"];
                    setRefriTime(dic(label,numberReverse));
                }
            });
        await axios
            .get(`${url}/count/week/refrigerator`)
            .then(json => {
                if (json.data.length === 7) {
                    const numberData = json.data.map((str: string) => parseInt(str));
                    const numberReverse = numberData.reverse();
                    const label=["7일전","6일전","5일전","4일전","3일전","2일전","1일전"];
                    setRefriDay(dic(label,numberReverse));
                }
            });
        await axios
            .get(`${url}/count/month/refrigerator`)
            .then(json => {
                if (json.data.length === 4) {
                    const numberData = json.data.map((str: string) => parseInt(str));
                    const numberReverse = numberData.reverse();
                    const label=["4주전","3주전","2주전","1주전"];
                    setRefriWeek(dic(label,numberReverse));
                }
            });
        await axios.get(`${url}/count/day/door`).then(json => {
            if (json.data.length === 6) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["6시간전","5시간전","4시간전","3시간전","2시간전","1시간전"];
                setDoorTime(dic(label,numberReverse));
            }
        });
        await axios.get(`${url}/count/week/door`).then(json => {
            if (json.data.length === 7) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["7일전","6일전","5일전","4일전","3일전","2일전","1일전"];
                setDoorDay(dic(label,numberReverse));
            }
        });
        await axios.get(`${url}/count/month/door`).then(json => {
            if (json.data.length === 4) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["4주전","3주전","2주전","1주전"];
                setDoorWeek(dic(label,numberReverse));
            }
        });
        await axios.get(`${url}/sleepTime/week`).then(json => {
            if (json.data.length === 7) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["7일전","6일전","5일전","4일전","3일전","2일전","1일전"];
                setSleepDay(dic(label,numberReverse));
            }
        });
        await axios.get(`${url}/sleepTime/month`).then(json => {
            if (json.data.length === 4) {
                const numberData = json.data.map((str: string) => parseInt(str));
                const numberReverse = numberData.reverse();
                const label=["4주전","3주전","2주전","1주전"];
                setSleepWeek(dic(label,numberReverse));
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
        axios.get(`${url}/fallen`).then(json => {
            const data = json.data;
            setIsFall(data)

        });
    },1000)


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <>

            {
                id ==="sleep" && period ==="day" ?
                    sleepTime ===0 && isFall === false?
                        <BsEmojiSmile style={{color:"grey",width:"inherit",height:"inherit"}}/> :
                        sleepTime ===1 && isFall === true?
                            <BsEmojiFrown style={{color:"red",width:"inherit",height:"inherit"}}/> : null :null
            }
            {
                id ==="sleep" && period ==="day" ?
                    sleepDay ===1 && isFall === false?
                        <GiNightSleep style={{color:"grey",width:"inherit",height:"inherit"}}/> :
                        sleepDay ===1 && isFall === true?
                            <BsEmojiFrown style={{color:"red",width:"inherit",height:"inherit"}}/> : null :null
            }
            {
                id === "sleep" ? period ==="week" ?
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
                    : period ==="month" ?
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
                id==="door" && period ==="day" ?
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
                    id==="door" && period==="week"?
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
                        id==="door" && period ==="month" ?
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
                id==="refrigerator" && period ==="day" ?
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
                    id==="refrigerator" && period==="week"?
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
                        id==="refrigerator" && period ==="month" ?
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

        </>
    );
}
export default Graph;

