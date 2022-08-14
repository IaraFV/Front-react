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
  render() {
    return (
      <ResponsiveContainer width="100%" height="95%">
        <AreaChart
          width={500}
          height={800}
          data={data}
          margin={{
            top: 40,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#E9C46A" fill="#E9C46A" opacity= '0.8' />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

