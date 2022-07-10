/*import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "number", label: "x" },
    { type: "number", label: "values" },
    { id: "i0", type: "number", role: "interval" },
    { id: "i1", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
  ],
  [1, 100, 90, 110, 85, 96, 104, 120],
  [2, 120, 95, 130, 90, 113, 124, 140],
  [3, 130, 105, 140, 100, 117, 133, 139],
  [4, 90, 85, 95, 85, 88, 92, 95],
  [5, 70, 74, 63, 67, 69, 70, 72],
  [6, 30, 39, 22, 21, 28, 34, 40],
  [7, 80, 77, 83, 70, 77, 85, 90],
  [8, 100, 90, 110, 85, 95, 102, 110],
];

export const options = {
  title: "",
  curveType: "function",
  series: [{ color: "#FEB95A" }],
  intervals: { style: "area" },
  legend: "none",
  backgroundColor: "none"
};

export function Graf() {
  return (
    <Chart
      chartType="LineChart"
      width="109%"
      height="38rem"
      data={data}
      options={options}
    
    />
  );
}*/
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Segunda',
    uv: 2000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Terça',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Quarta',
    uv: 1000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Quinta',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Sexta',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Sábado',
    uv: 1000,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Domingo',
    uv: 2000,
    pv: 4300,
    amt: 2100,
  },
];

export class Graf extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-area-chart-4ujxw';

  render() {
    return (
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 80,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#E9C46A" fill="#E9C46A" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

