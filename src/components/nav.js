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
                <AppBar position="static" color="inherit">
                    <Toolbar>
                        <Grid container justify="space-between" alignItems="center">
                            <Avatar src="/lookair.png" alt="logo" />
                            <Typography variant="title" color="inherit" >
                                DASHBOARD
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