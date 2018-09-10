import React from 'react';
import { Typography } from '@material-ui/core';

const CardHeader = ({...props}) => (
    <div className="cardHeader">
        <div className="cardHeader-title">
            <Typography variant={props.variant} style={{color: 'rgb(49,74,95)'}}>{ props.title }</Typography>
        </div>
        {props.children}
    </div>
)

export default CardHeader;