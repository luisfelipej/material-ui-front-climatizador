import React from 'react';
import { Typography} from '@material-ui/core';

const CardIcon = props => (
    <div className="cardIcon">
        <Typography variant="title" color="inherit">
            {props.title} °C
        </Typography>
        {props.children}
    </div>

)

export default CardIcon;