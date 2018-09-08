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


class ConfigUsuario extends Component{
    state = {
        open: false,
        tempUsuario: this.props.tempUsuario
    }
    handleClose = ()=>{
        this.setState({open: false})
    }
    handleClickOpen = () =>{
        this.setState({open: true})
    }
    handleSend = (tempUsuario) => {
        // this.props.handleTempUsuario(tempUsuario);
        this.setState({open: false})
        // io.emit('clientTemp',this.state.tempUsuario);
    }
    render(){
        return(
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item alignContent="center" style={{display: 'flex', marginBottom: '2em'}}>
                            <SettingsOutlined/>
                            <Typography variant="title">Configuraciones</Typography>
                        </Grid>
                        <Grid item spacing={16} alignItems="center" style={{display:'flex', justifyContent:'space-around'}}>
                            <Button onClick={this.handleClickOpen} style={{marginRight: '32px'}}>Temperatura deseada</Button>
                            <Typography>{ `${this.state.tempUsuario}°C`}</Typography>

                            <Dialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            open = {this.state.open}
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
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }
}

export default ConfigUsuario