import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Grid, Menu, MenuItem, Button } from '@material-ui/core';
import { Settings } from '@material-ui/icons';

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
                    <MenuItem>Ejemplo</MenuItem>
                    <MenuItem>Ejemplo</MenuItem>
                    <MenuItem>Ejemplo</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default Navbar;