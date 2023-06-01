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
    const [doorDay, setDoorDay] = useState([]);
    const [doorWeek, setDoorWeek] = useState([]);
    const [doorMonth, setDoorMonth] = useState([]);

    const [refDay, setRefDay] = useState([]);
    const [refrigWeek, setRefrigWeek] = useState([]);
    const [refrigMonth, setRefrigMonth] = useState([]);

    const [sleepDay, setSleepDay] = useState([]);
    const [sleepWeek, setSleepWeek] = useState([]);
    const [sleepMonth, setSleepMonth] = useState([]);


    const [isFall, setIsFall] = useState(false);
    const [show, setShow] = useState(false);

    let count;
    console.log(id)
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
        getDoor();
        getSleep();
        getRefrig();
        axios.get('http://15.164.7.163:8080/fallen').then(json => {
            const data = json.data;
            console.log("$$$$$$",data);
            setIsFall(data)

        });
    }, 5000);

    let label =[];
    const getDoor = async ()=>{
        await axios
            .get(`${url}/count/day/door`)
            .then(json => {
                label=["6시간전","5시간전","4시간전","3시간전","2시간전","1시간전"];
                const numberData = json.data.map((str: string) => parseInt(str));
                setDoorDay(dictionary(label,numberData.reverse()));
                //console.log(`${id}, day`,numberData);
                //console.log(`d, day`,doorDay);
            });
        await axios
            .get(`${url}/count/week/door`)
            .then(response => {
                label=["7일전","6일전","5일전","4일전","3일전","2일전","1일전"];
                const numberData = response.data.map((str: string) => parseInt(str));
                setDoorWeek(dictionary(label,numberData));
                //console.log(`${id}, day`,numberData);
                console.log(`d, week`,doorWeek);
            });
        await axios
            .get(`${url}/count/month/door`)
            .then(json => {
                console.log(json);

                label=["4주전","3주전","2주전","1주전"];
                const numberData = json.data.map((str: string) => parseInt(str));
                console.log(numberData);

                setDoorMonth(dictionary(label,numberData));
                //console.log(`${id}, day`,numberData);
                console.log(`${id}, month`,doorMonth);
            });
    }
    const getRefrig = async ()=>{
        await axios
            .get(`${url}/count/day/refrigerator`)
            .then(json => {
                label=["6시간전","5시간전","4시간전","3시간전","2시간전","1시간전"];
                const numberData = json.data.map((str: string) => parseInt(str));
                setRefDay(dictionary(label,numberData.reverse()));
                console.log(`${id}, day`,refDay);
            });
        await axios
            .get(`${url}/count/week/refrigerator`)
            .then(json => {
                label=["7일전","6일전","5일전","4일전","3일전","2일전","1일전"];
                const numberData = json.data.map((str: string) => parseInt(str));
                setRefrigWeek(dictionary(label,numberData.reverse()));
                //console.log(`${id}, day`,numberData);
                console.log(`${id}, week`,refrigWeek);
            });
        await axios
            .get(`${url}/count/month/refrigerator`)
            .then(json => {
                label=["4주전","3주전","2주전","1주전"];
                const numberData = json.data.map((str: string) => parseInt(str));
                setRefrigMonth(dictionary(label,numberData.reverse()));
                //console.log(`${id}, day`,numberData);
                console.log(`${id}, month`,refrigMonth);
            });
    }
    const getSleep = async ()=>{
        await axios
            .get(`${url}/sleepTime/day`)
            .then(json => {
                const numberData = json.data.map((str: string) => parseInt(str));
                setSleepDay(numberData);
                console.log(`${id}, day`,sleepDay);
            });
        await axios
            .get(`${url}/sleepTime/week`)
            .then(json => {
                label=["7일전","6일전","5일전","4일전","3일전","2일전","1일전"];
                const numberData = json.data.map((str: string) => parseInt(str));
                setSleepWeek(dictionary(label,numberData.reverse()));
                console.log(`${id}, week`,sleepWeek);
            });
        await axios
            .get(`${url}/sleepTime/month`)
            .then(json => {
                label=["4주전","3주전","2주전","1주전"];
                const numberData = json.data.map((str: string) => parseInt(str));
                setSleepMonth(dictionary(label,numberData.reverse()));
                console.log(`${id}, month`,sleepMonth);
            });
    }


    useEffect( ()=>{
        isFall == true ?
        setShow(true):setShow(false)
    },[]);

    function dictionary(a,b){
        const data = a.reduce((acc, key, index) => {
            acc.push({
                name: key,
                val: Number(b[index]),
            });
            return acc;
        },[]);
        return data;
    }
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
                        <BarChart width={500} height={490} data={sleepWeek}
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
                                data={sleepMonth}
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                innerRadius={75}
                                fill="#8884d8"
                                label
                            >
                            {sleepMonth.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                                </Pie>
                            <Tooltip />
                        </PieChart>:null:null
            }
            {
                id=="door" && period =="day" ?
                        <BarChart width={500} height={490} data={doorDay}
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
                    id=="door" && period=="week"?
                        <AreaChart
                            width={500}
                            height={500}
                            data={doorWeek}
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
                                    data={doorMonth}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    innerRadius={75}
                                    fill="#8884d8"
                                    label
                                >
                                    {doorMonth.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart> :null
            }
            {
                id=="refrigerator" && period =="day" ?
                    <BarChart width={500} height={490} data={refDay}
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
                            data={refrigWeek}
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
                                    data={refrigMonth}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    innerRadius={75}
                                    fill="#8884d8"
                                    label
                                >
                                    {refrigMonth.map((entry, index) => (
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
