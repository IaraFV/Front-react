import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Segunda',
    uv: 2000,
    
  },
  {
    name: 'Terça',
    uv: 3000,
    
  },
  {
    name: 'Quarta',
    uv: 1000,
   
  },
  {
    name: 'Quinta',
    uv: 2780,
    
  },
  {
    name: 'Sexta',
    uv: 1890,
   
  },
  {
    name: 'Sábado',
    uv: 1000,
    
  },
  {
    name: 'Domingo',
    uv: 2000,
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
          <Area type="monotone" dataKey="uv" stroke="#E9C46A" fill="rgba(233, 196, 106, 0.2)" opacity= '0.8' />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

