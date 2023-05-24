import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 100,
        pv: 150,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 110,
        pv: 130,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 130,
        pv: 150,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 140,
        pv: 150,
        amt: 2000,
    },

];

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

    render() {
        return (

                <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                        top: 15,
                        right: 30,
                        left: 20,
                        bottom: 5,
                     }}
                 >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 8 }}/>
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
