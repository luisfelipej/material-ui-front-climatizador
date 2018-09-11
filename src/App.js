import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Grid } from '@material-ui/core';


import './App.css';

import Navbar from './components/nav';
import GraficoTemp from './components/GraficoTemp';
import TempProm from './components/TempProm';
import ConfigUsuario from './components/ConfigUsuario';
import Snack from './components/Snack';
import Consumos from './components/Consumos';
import Estados from './components/Estados';

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
    contConsumoCal: 0,
    contConsumoVen: 0,
    calefactor: false,
    ventilador: false,
    consumoCal: '2000',
    consumoVen: '2000',
    consumoData:{
      labels: ['Calefactor', 'Ventilador'],
      datasets: [
        {
          label: 'Consumo (W)',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [0, 0]
        }
      ]
    },
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
    });
    socket.on('cON',()=>this.setState({
      calefactor: true,
      contConsumoCal: this.state.contConsumoCal + 5,
      consumoData:{
        labels: ['Calefactor', 'Ventilador'],
        datasets: [
          {
            label: 'Consumo (W)',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [this.state.consumoData.datasets[0].data[0]+(this.state.consumoCal/3600).toFixed(2)*this.state.contConsumoCal,this.state.consumoData.datasets[0].data[1] ]
          }
        ]
      }}));
    socket.on('cOFF',()=>this.setState({calefactor: false}));
    socket.on('vON',()=>this.setState({
      ventilador: true,
      contConsumoVen: this.state.contConsumoVen + 5,
      consumoData:{
        labels: ['Calefactor', 'Ventilador'],
        datasets: [
          {
            label: 'Consumo (W)',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [this.state.consumoData.datasets[0].data[0],this.state.consumoData.datasets[0].data[1]+(this.state.consumoVen/3600).toFixed(2)*this.state.contConsumoVen ]
          }
        ]
      }}));
    socket.on('vOFF',()=>this.setState({ventilador: false}));
    socket.on('conCa',(consumoCal)=>this.setState({consumoCal}));
    socket.on('conVe',(consumoVen)=>this.setState({consumoVen}));
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
    return (
      <div style={{backgroundColor: 'rgb(10,11,17)'}}>
        <Navbar data={this.state} prom={PROM}/>
        <Grid container style={{padding: 40, marginTop:'36px'}} spacing={16}>
          <Grid item xs={12} sm={12} lg={4} md={4}>
            <TempProm prom={PROM}  tempU={this.state.tempUsuario} tmax={this.state.tempMaxima} tmin={this.state.tempMinima}/>
            <Consumos data={this.state.consumoData} />
            <ConfigUsuario tempUsuario={this.state.tempUsuario} conCa={this.state.consumoCal} conVe={this.state.consumoVen} />
          </Grid>
          <Grid item sm={12} lg={8} md={8} >
            <GraficoTemp id="graficoTemp" data={this.state.grafData} temp={this.state.temp} />
            <Estados calefactor={this.state.calefactor} ventilador={this.state.ventilador} />
          </Grid>
        </Grid>



        {/* SNACK */}
        <Snack estado={this.state.snackOpen} off={()=>this.setState({snackOpen: false})}/>
      </div>
    );
  }
}

export default App;
