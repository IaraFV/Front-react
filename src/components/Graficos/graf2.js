
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell,  ResponsiveContainer } from 'recharts';

export  class Graf2 extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/bar-chart-with-customized-event-4k1bd';

  state = {
    data: [
      {
        name: 'Segunda',
        pessoas_adicionadas: 4000,

      },
      {
        name: 'Page B',
        pessoas_adicionadas: 3000,

      },
      {
        name: 'Page C',
        pessoas_adicionadas: 2000,
        
      },
      {
        name: 'Page D',
        pessoas_adicionadas: 2780,
       
      },
      {
        name: 'Page E',
        pessoas_adicionadas: 1890,
       
      },
      {
        name: 'Page F',
        pessoas_adicionadas: 2390,
       
      },
      {
        name: 'Page G',
        pessoas_adicionadas: 3490,
       
      },
    ],
    activeIndex: 0,
  };

  handleClick = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { activeIndex, data } = this.state;
    const activeItem = data[activeIndex];

    return (
      <div style={{ width: '90%', color: '#A0A0A0', marginLeft: '2.8%', marginTop: '2.5%' }}>
        <p>*Clique no retangulo para ver os valores obtidos de task's adicionadas no periodo de uma semana</p>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart width={150} height={40} data={data}>
            <Bar dataKey="pessoas_adicionadas" onClick={this.handleClick}>
              {data.map((entry, index) => (
                <Cell cursor="pointer" fill={index === activeIndex ? '#A9DFD8' : '#98C1D9'} key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="content">{`Pessoas_adicionadas of "${activeItem.name}": ${activeItem.pessoas_adicionadas}`}</p>
      </div>
    );
  }
}
