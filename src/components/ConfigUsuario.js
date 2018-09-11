import React, { Component } from 'react';

import {Typography,
    CardContent,
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField
} from '@material-ui/core';
import { SettingsOutlined } from '@material-ui/icons';
import Card from './Card';

import socketIo from 'socket.io-client';
const socket = socketIo('http://localhost:4001');


class ConfigUsuario extends Component{
    state = {
        openTemp: false,
        openPC: false,
        openPV: false,
        tempUsuario: this.props.tempUsuario,
        consumoCa: this.props.conCa,
        consumoVe: this.props.conVe
    }
    handleClose = ()=>{
        this.setState({openTemp: false, openPC: false, openPV: false})
    }
    handleClickOpen = () =>{
        this.setState({openTemp: true})
    }
    handleSend = () => {
        this.setState({openTemp: false})
        socket.emit('clientTemp', this.state.tempUsuario);
    }
    render(){
        return(
            <Card>
                <CardContent>
                    <Grid container >
                        <Grid item alignContent="center" style={{display: 'flex', marginBottom: '2em'}}>
                            <SettingsOutlined/>
                            <Typography variant="title" color="inherit">Configuraciones</Typography>
                        </Grid>
                        <Grid container spacing={16} alignItems="center" justify="space-between" >
                            <Grid item>
                                <Button color="inherit" onClick={this.handleClickOpen} >Temperatura deseada</Button>
                            </Grid>
                            <Grid item>
                                <Typography color="inherit">{ `${this.props.tempUsuario}°C`}</Typography>
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={16} alignItems="center" justify="space-between">
                            <Grid item>
                                <Button color="inherit" onClick={()=>this.setState({openPC: true})} >Consumo calefactor</Button>
                            </Grid>
                            <Grid item>
                                <Typography color="inherit">{ `${this.props.conCa} W`}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={16} alignItems="center" justify="space-between">
                            <Grid item>
                                <Button color="inherit" onClick={()=>this.setState({openPV: true})} >Consumo ventilador</Button>
                            </Grid>
                            <Grid item>
                                <Typography color="inherit">{ `${this.props.conVe} W`}</Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </CardContent>




                {/* Dialogs */}
                <Dialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            open = {this.state.openTemp}
                            onClose={this.handleClose}
                            >
                                <DialogTitle>Selecciona la temperatura que quieras</DialogTitle>
                                <DialogContent style={{display: 'flex', justifyContent:'center'}}>
                                    <form autoComplete='false'>
                                        <FormControl>
                                            <TextField
                                            id='temperaturaUsuario'
                                            label='Temperatura (°C)'
                                            defaultValue={this.state.tempUsuario}
                                            type='number'
                                            required
                                            onChange={(e)=>this.setState({tempUsuario: e.target.value})} 
                                             />
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                Cancel
                                </Button>
                                <Button onClick={()=>this.handleSend(this.state.tempUsuario)} color="primary">
                                Ok
                                </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            open = {this.state.openPC}
                            onClose={this.handleClose}
                            >
                                <DialogTitle>Indique la potencia de su calefactor</DialogTitle>
                                <DialogContent style={{display: 'flex', justifyContent:'center'}}>
                                    <form autoComplete='false'>
                                        <FormControl>
                                            <TextField
                                            id='consumoCalefactor'
                                            label='Potencia (W)'
                                            defaultValue={this.state.consumoCa}
                                            type='number'
                                            required
                                            onChange={(e)=>this.setState({consumoCa: e.target.value})} 
                                             />
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                Cancel
                                </Button>
                                <Button onClick={()=>{
                                    socket.emit('conCa',this.state.consumoCa);
                                    this.setState({openPC: false})
                                }} color="primary">
                                Ok
                                </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            open = {this.state.openPV}
                            onClose={this.handleClose}
                            >
                                <DialogTitle>Indique la potencia de su ventilador</DialogTitle>
                                <DialogContent style={{display: 'flex', justifyContent:'center'}}>
                                    <form autoComplete='false'>
                                        <FormControl>
                                            <TextField
                                            id='consumoVentilador'
                                            label='Potencia (W)'
                                            defaultValue={this.state.consumoVe}
                                            type='number'
                                            required
                                            onChange={(e)=>this.setState({consumoVe: e.target.value})} 
                                             />
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                Cancel
                                </Button>
                                <Button onClick={()=>{
                                    socket.emit('conVe',this.state.consumoVe);
                                    this.setState({openPV: false})
                                }} color="primary">
                                Ok
                                </Button>
                                </DialogActions>
                            </Dialog>
            </Card>
        )
    }
}

export default ConfigUsuario