import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Grid } from '@material-ui/core';

import './App.css';

import Navbar from './components/nav';
import GraficoTemp from './components/GraficoTemp';
import TempProm from './components/TempProm';

class App extends Component {
  state = {
    endpoint: 'http://localhost:4001',
    temp: 'ARDUINO DESCONECTADO',
    connected: false,
    contTemp: 0,
    grafData: {
      labels: ['5 [s]'],
          datasets: [
              {
              label: 'Temperatura en °C',
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              data: []
              }
          ]
    }
  }
  componentDidMount(){
    const socket = socketIOClient(this.state.endpoint);
    socket.on('connect',()=>{
      // console.log(this.state)
      this.setState({connected: true});
    })
    socket.on('temp', (temp)=>{
      this.setState({temp, contTemp: this.state.contTemp + 5});
      this.setState({
        grafData: {
          labels: [...this.state.grafData.labels, `${this.state.contTemp + 5} [s]`],
              datasets: [
                  {
                  label: 'Temperatura en °C',
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  data: [...this.state.grafData.datasets[0].data, temp],
                  steppedLine:  false
                  }
              ]
        }
      })
    });
    socket.on('close', ()=>{
      this.setState({temp: 'ARDUINO DESCONECTADO', connected: false});
      // M.toast({html:'Se desconectó ARDUINO', classes:'red darken-4'});
    });
  }
  render() {
    return (
      <div>
        <Navbar/>
        <Grid container style={{padding: 40}} spacing={16} justify="flex-start" alignContent="flex-start">
        <Grid item xs={12} sm={12} lg={4} zeroMinWidth={100}>
          <TempProm></TempProm>
        </Grid>
          <Grid item sm={12} lg={4} zeroMinWidth={100}>
            <GraficoTemp data={this.state.grafData}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
