import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Grid, Snackbar, SnackbarContent, Typography, IconButton } from '@material-ui/core';
import { Error as ErrorIcon, Close as CloseIcon } from '@material-ui/icons';

import './App.css';

import Navbar from './components/nav';
import GraficoTemp from './components/GraficoTemp';
import TempProm from './components/TempProm';
import ConfigUsuario from './components/ConfigUsuario';

class App extends Component {
  state = {
    snackOpen: false,
    endpoint: 'http://localhost:4001',
    temp: 'ARDUINO DESCONECTADO',
    tempUsuario: '20',
    connected: false,
    contTemp: 0,
    grafData: {
      labels: ['5 [s]'],
          datasets: [
              {
              label: 'Temperatura en °C',
              fill: null,
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
      this.setState({temp: 'ARDUINO DESCONECTADO', connected: false, snackOpen: true});
    });
    socket.on('tempUsuario', (data)=>{
      this.setState({tempUsuario: data});
    })
  }
  render() {
    return (
      <div>
        <Navbar/>
        <Grid container style={{padding: 40}} spacing={16}>
        <Grid item xs={12} sm={12} lg={4} md={4}>
          <TempProm tempU={this.state.tempUsuario}/>
          <ConfigUsuario tempUsuario={this.state.tempUsuario}/>
        </Grid>
          <Grid item sm={12} lg={8} md={8}>
            <GraficoTemp data={this.state.grafData} temp={this.state.temp}/>
          </Grid>
        </Grid>



        {/* SNACK */}
        <Snackbar anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.state.snackOpen}
        autoHideDuration={6000}
        onClose={(event, reason)=>{
          if(reason === 'clickaway') return;
          this.setState({snackOpen: false})
        }}
        >
          <SnackbarContent
          style={{backgroundColor: 'rgb(211,47,47)'}}
          aria-describedby="client-snackbar"
          message={
            <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
              <ErrorIcon style={{marginRight: '5px'}} /> <Typography color="inherit">Se desconectó arduino</Typography>
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={()=>this.setState({snackOpen: false})}
            >
              <CloseIcon />
            </IconButton>,
          ]}
          />
        </Snackbar>
      </div>
    );
  }
}

export default App;
