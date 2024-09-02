import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const performanceData = [
    { name: 'Jan', performance: 4000 },
    { name: 'Feb', performance: 3000 },
    { name: 'Mar', performance: 2000 },
    { name: 'Apr', performance: 2780 },
    { name: 'May', performance: 1890 },
    { name: 'Jun', performance: 2390 },
    { name: 'Jul', performance: 3490 },
];

const lossData = [
    { name: 'Jan', loss: 2400 },
    { name: 'Feb', loss: 1398 },
    { name: 'Mar', loss: 9800 },
    { name: 'Apr', loss: 3908 },
    { name: 'May', loss: 4800 },
    { name: 'Jun', loss: 3800 },
    { name: 'Jul', loss: 4300 },
];

const barChartData = [
    { name: 'A', uv: 4000, pv: 2400 },
    { name: 'B', uv: 3000, pv: 1398 },
    { name: 'C', uv: 2000, pv: 9800 },
    { name: 'D', uv: 2780, pv: 3908 },
    { name: 'E', uv: 1890, pv: 4800 },
    { name: 'F', uv: 2390, pv: 3800 },
    { name: 'G', uv: 3490, pv: 4300 },
];


const Home: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className='py-1'>Admin Dashboard</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <div style={{ width: '30%' }}>
                <h2>Performance Chart</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={performanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="performance" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div style={{ width: '30%' }}>
                <h2>Admission Chart</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={lossData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="loss" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div style={{ width: '30%' }}>
                <h2>New admission </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={barChartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uv" fill="#8884d8" />
                        <Bar dataKey="pv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
    );
};

export default Home;
