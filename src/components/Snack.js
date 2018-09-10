import React from 'react';

import { Snackbar, SnackbarContent, Typography, IconButton } from '@material-ui/core';
import { Error as ErrorIcon, Close as CloseIcon } from '@material-ui/icons';

class Snack extends React.Component{
    render(){
        return(
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={this.props.estado}
              autoHideDuration={6000}
              onClose={(event, reason)=>{
                if(reason === 'clickaway') return;
                this.props.off();
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
                    onClick={()=>this.props.off()}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
                />
              </Snackbar>
        )
    }
}

export default Snack;