import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
];

const calculation = (data, name) => {
  const number = data.length; // количество элементов
  const avg = data.reduce((acc, currentValue) => acc + currentValue[name], 0) / number; // среднее значение
  const dispersion = data.reduce((acc, currentValue) => acc + Math.pow(currentValue[name] - avg, 2), 0) / number; // дисперсия
  const stddev = Math.sqrt(dispersion); // среднеквадратичное отклонение
  const max = data.reduce((max, obj) => Math.max(max, obj[name]), -Infinity); // находим максимальное значение
  return { avg, stddev, max }; // возвращаем объект
}

const avg_plus_stddev = (data, name) => {
  const { avg, stddev, max } = calculation(data, name);
  return (avg + stddev) / max; // коэффициент для максимального значения
}
const avg_minus_stddev = (data, name) => {
  const { avg, stddev, max } = calculation(data, name);
  return (avg - stddev) / max; // коэффициент для максимального значения
}

const App = () => {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
      <defs>
        <linearGradient id="uv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="red" />
          <stop offset={avg_minus_stddev(data, 'uv')} stopColor="red" />
          <stop offset={avg_minus_stddev(data, 'uv')} stopColor="green" />
          <stop offset={avg_plus_stddev(data, 'uv')} stopColor="green" />
          <stop offset={avg_plus_stddev(data, 'uv')} stopColor="red" />
          <stop offset="1" stopColor="red" />
        </linearGradient>
        <linearGradient id="pv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="red" />
          <stop offset={avg_minus_stddev(data, 'pv')} stopColor="red" />
          <stop offset={avg_minus_stddev(data, 'pv')} stopColor="green" />
          <stop offset={avg_plus_stddev(data, 'pv')} stopColor="green" />
          <stop offset={avg_plus_stddev(data, 'pv')} stopColor="red" />
          <stop offset="1" stopColor="red" />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="url(#uv)"
        dot={false}
        activeDot={{ r: 4 }}
      />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="url(#pv)"
        dot={false}
        activeDot={{ r: 4 }}
      />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default App;
