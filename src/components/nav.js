import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Grid, Menu, MenuItem, Button } from '@material-ui/core';
import { Settings, PowerSettingsNew, GetApp } from '@material-ui/icons';
import imgData from '../logoData';
var jsPDF = require('jspdf');
require('jspdf-autotable');

class Navbar extends Component{
    state = {
        anchorEl: null
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () =>{
        this.setState({ anchorEl: null })
    }
    crearPDF = (e) =>{
        const columns = [
            {title: 'Temperatura promedio', dataKey: 'tprom'},
            {title: 'Temperatura máxima', dataKey: 'tmax'},
            {title: 'Temperatura mínima', dataKey: 'tmin'},
            {title: 'Tiempo transcurrido', dataKey: 'tiempo'},
        ];
        const rows = [
            {tprom: `${this.props.prom}°C`,
            tmax: `${this.props.data.tempMaxima}°C`,
            tmin: `${this.props.data.tempMinima}°C`,
            tiempo: `${this.props.data.contTemp}[s]`
        }
        ]
        const columns2=[
            {title: 'Consumo total Calefactor', dataKey: 'cC'},
            {title: 'Tiempo encendido Calefactor', dataKey: 'tC'},
            {title: 'Consumo total Ventilador', dataKey: 'cV'},
            {title: 'Tiempo encendido Ventilador', dataKey: 'tV'},
        ]
        const rows2 = [
            {cC: `${this.props.data.consumoData.datasets[0].data[0] || 'Sin datos'} W`,
            tC: `${this.props.data.contConsumoCal || 'Sin datos'} [s]`,
            cV: `${this.props.data.consumoData.datasets[0].data[1] || 'Sin datos'} W`,
            tV: `${this.props.data.contConsumoVen || 'Sin datos'} [s]`}
        ]


        const pdf = new jsPDF();
        pdf.addImage(imgData,'JPEG',5,5,15,13);
        pdf.setFontSize(20);
        pdf.text('REPORTE CLIMATIZADOR PORTATIL',40,13);
        pdf.autoTable(columns,rows,{
            startY: pdf.autoTableEndPosY() + 20,
            margin: { horizontal: 10 },
            styles: { overflow: 'linebreak' },
            bodyStyles: { valign: 'top' },
            columnStyles: { email: { columnWidth: 'wrap' } },
            theme: "grid"
        });
        pdf.autoTable(columns2,rows2,{
            startY: pdf.autoTableEndPosY() + 20,
            margin: { horizontal: 10 },
            styles: { overflow: 'linebreak' },
            bodyStyles: { valign: 'top' },
            columnStyles: { email: { columnWidth: 'wrap' } },
            theme: "grid"
        });



        pdf.save('reporte-climatizador.pdf');
    }

    render(){
        const { anchorEl } = this.state;
        return(
            <div>
                <AppBar position="fixed" style={{backgroundColor: 'rgb(20, 20, 29)'}}>
                    <Toolbar>
                        <Grid container justify="space-between" alignItems="center">
                            <img src="logo-final.png" width="70px" />
                            <Typography variant="title" color="inherit" >
                                CLIMATIZADOR PORTÁTIL
                            </Typography>
                            <Button
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            color="inherit"
                            >
                                <Settings />
                            </Button>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Menu
                id="settings"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                >
                    <MenuItem onClick={this.crearPDF}><GetApp style={{marginRight: '5px'}}/>Generar PDF</MenuItem>
                    <MenuItem><PowerSettingsNew style={{marginRight: '5px'}}/>Salir</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default Navbar;