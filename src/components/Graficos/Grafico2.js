
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  {
    name: "Segunda",
    uv: 4000,
    id: 2400,
    amt: 2400
  },
  {
    name: "Terca",
    uv: 3000,
    id: 1398,
    amt: 2210
  },
  {
  name: "Quarta",
    uv: 2000,
    id: 9800,
    amt: 2290
  },
  {
    name: "Quinta",
    uv: 2780,
    id: 3908,
    amt: 2000
  },
  {
    name: "Sexta",
    uv: 1890,
    id: 4800,
    amt: 2181
  },
  {
    name: "Sabado",
    uv: 2390,
    id: 3800,
    amt: 2500
  },
  {
    name: "Domingo",
    uv: 3490,
    id: 4300,
    amt: 2100
  }
];

function Grafico2() {
  return (
    <div>
      <AreaChart
        width={980}
        height={330}
        data={data}
        syncId="anyId"
        margin={{
          top: 24,
          right: 70,
          left: -5,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="id" stroke="#26A69A" fill="rgba(38, 166, 154, 0.5)" box-shadow= "0px 4px 4px rgba(0, 0, 0, 0.25);" opacity="0.4" border="none" />
      </AreaChart>
    </div>
  );
}

export default Grafico2;
