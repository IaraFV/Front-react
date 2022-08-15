
import React, { PureComponent, useState, useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


export function Graf2() {


  const [posts, setPosts] = useState([])
  const [initialPosts, setInitialPosts] = useState([])


  useEffect(() => {
    axios.get('https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas/')
      .then((response) => {
        console.log("foi")

      })
      .catch(() => {
        console.log("deu errado")
      })
  }, []
  )

  function Pessoasadd(props) {
    if(this.props.selectValue === 1){
      var datas = new Date();

      const Ultimapessoa = [new Date(),];

      for (let i = 0; i < 6; i++) {
        Ultimapessoa.push(new Date(datas.setDate(datas.getDate() - 1)));
        let PessoasAdicionadas = 0;
      const UltimasConcluidas = [];
      if (props.tarefas !== null) {
        props.tarefas.map(t => {
          if (t.status === "Concluido") {
            PessoasAdicionadas++;
            UltimasConcluidas.push(new Date(t.data_conclusao));
          }
        })
      }
    }
  }
  }

  var PessoasAdicionadas = [0, 0, 0, 0, 0, 0, 0];

  const data = [
    {
      id_pessoa: ""
    },

  ];

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={30}
    >
      <XAxis dataKey="id" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="id" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
  );
}