
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";


function Grafico2(props) {

  var dataatual = new Date('07-29-2022');


  const datau = [new Date('07-29-2022'),];

  for (let i = 0; i < 6; i++) {
    datau.push(new Date(dataatual.setDate(dataatual.getDate() - 1)));
  }

  console.log(datau)
  let pessoascontratadas = 0;

  const ultimaspessoascont = [];

  var Pessoasaddd = [0,0,0,0,0,0,0]

  if(props.pessoas !== null){
    props.pessoas.map ( p => {
      let i = -1;
      datau.map( d => {
        i++
        if ( new Date(p.data_contratacao).toISOString().split('T')[0] === d.toISOString().split('T')[0]){
          Pessoasaddd [i]++;
        }
      })
    })
  }

  console.log(Pessoasaddd)

  const datac = [
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

  return (
    <div>
      <AreaChart
        width={980}
        height={350}
        data={datac}
        syncId="anyId"
        margin={{
          top: 35,
          right: 70,
          left: -5,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="id" stroke=" rgba(233, 196, 106, 0.5)" fill="rgba(233, 196, 106, 0.5)" opacity="0.4" border="none" />
      </AreaChart>
    </div>
  );
}

export default Grafico2;
