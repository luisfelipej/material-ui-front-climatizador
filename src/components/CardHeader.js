import React from 'react';
import { Typography } from '@material-ui/core';

const CardHeader = ({...props}) => (
    <div className="cardHeader">
        <div className="cardHeader-title">
            <Typography variant={props.variant} color="inherit">{ props.title }</Typography>
        </div>
        {props.children}
    </div>
)

export default CardHeader;