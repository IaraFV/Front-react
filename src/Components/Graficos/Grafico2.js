
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

  var dataatual = new Date();


  const datau = [new Date(),];

  for (let i = 0; i < 6; i++) {
    datau.push(new Date(dataatual.setDate(dataatual.getDate() - 1)));
  }
 

  var Pessoasaddd = [0,0,0,0,0,0,0]
  datau.reverse();

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

  const datac = [];

  for (let i = 0; i<7; i++) {
    const Dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    let DiaUnico = datau[i].getDay();
    let DiadaSemana;
    if (DiaUnico === 0) {
      DiadaSemana = Dias[0];
    } else if (DiaUnico === 1) {
      DiadaSemana = Dias[1];
    } else if (DiaUnico === 2) {
      DiadaSemana = Dias[2];
    } else if (DiaUnico === 3) {
      DiadaSemana = Dias[3];
    } else if (DiaUnico === 4) {
      DiadaSemana = Dias[4];
    } else if (DiaUnico === 5) {
      DiadaSemana = Dias[5];
    } else if (DiaUnico === 6) {
      DiadaSemana = Dias[6];
    }
   
  
    let dataFormatada = `${DiadaSemana} ${datau[i].getDate()}`;
    const obj = {"name": dataFormatada, "y": Pessoasaddd[i]};
    datac.push(obj);


  }

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
        <Area type="monotone" dataKey="y" stroke=" rgba(233, 196, 106, 0.5)" fill="rgba(233, 196, 106, 0.5)" opacity="0.4" border="none" />
      </AreaChart>
    </div>
  );
}

export default Grafico2;
