import React from 'react';
import { Typography} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
const errorColor = red[900];

const CardIcon = props => (
    <div>
    {
                (props.error)
                ?
                <div className="cardIcon" style={{backgroundColor: errorColor, transition: 'all .5s ease'}}>
                    <Typography variant="title" color="inherit">
                        {props.title}
                    </Typography>
                    {props.children}
                </div>
                :
                <div className="cardIcon" style={{transition: 'all .5s ease'}}>
                    <Typography variant="title" color="inherit">
                        {props.title}
                    </Typography>
                    {props.children}
                </div>
    }
    </div>

)

export default CardIcon;