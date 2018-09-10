import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Grid } from '@material-ui/core';


import './App.css';

import Navbar from './components/nav';
import GraficoTemp from './components/GraficoTemp';
import TempProm from './components/TempProm';
import ConfigUsuario from './components/ConfigUsuario';
import Snack from './components/Snack';

class App extends Component {
  state = {
    snackOpen: false,
    endpoint: 'http://localhost:4001',
    temp: '',
    tempPromedio: '',
    tempUsuario: '20',
    tempMaxima: 0,
    tempMinima: 31,
    connected: false,
    contTemp: 0,
    grafData: {
      labels: ['5 [s]'],
          datasets: [
              {
              label: 'Temperatura en °C',
              fill: null,
              backgroundColor: 'rgba(0,221,0,.6)',
              borderColor: 'rgba(0,221,0,.6)',
              pointBorderColor: 'rgba(0,221,0,.6)',
              pointBackgroundColor: '#fff',
              pointHoverBackgroundColor: 'rgba(0,221,0,.6)',
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
                  data: [...this.state.grafData.datasets[0].data, temp],
                  steppedLine:  false
                  }
              ]
        }
      })
    });
    socket.on('close', ()=>{
      this.setState({temp: '', connected: false, snackOpen: true});
    });
    socket.on('tempUsuario', (data)=>{
      this.setState({tempUsuario: data});
    })
  }
  sumaTemps(data){
    let suma = 0;
    for (let i=0;i<data.length;i++){
      suma += Number(data[i]);
      if(Number(data[i])>Number(this.state.tempMaxima)) this.setState({tempMaxima: Number(data[i])})
      if(Number(data[i])<Number(this.state.tempMinima)) this.setState({tempMinima: Number(data[i])})
    }
    return suma;
  }
  render() {
    const SUMTEMP = this.sumaTemps(this.state.grafData.datasets[0].data);
    const PROM = (SUMTEMP/this.state.grafData.datasets[0].data.length).toFixed(1);
    console.log(PROM)
    return (
      <div style={{backgroundColor: 'rgb(10,11,17)'}}>
        <Navbar/>
        <Grid container style={{padding: 40}} spacing={16}>
        <Grid item xs={12} sm={12} lg={4} md={4}>
          <TempProm prom={PROM}  tempU={this.state.tempUsuario} tmax={this.state.tempMaxima} tmin={this.state.tempMinima}/>
          <ConfigUsuario tempUsuario={this.state.tempUsuario} />
        </Grid>
          <Grid item sm={12} lg={8} md={8}>
            <GraficoTemp data={this.state.grafData} temp={this.state.temp} />
          </Grid>
        </Grid>



        {/* SNACK */}
        <Snack estado={this.state.snackOpen} off={()=>this.setState({snackOpen: false})}/>
      </div>
    );
  }
}

export default App;
